import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';
//Selectors
export const getAdverts = ({ adverts }) => adverts.data;
export const getRequest = ({ adverts }) => adverts.request;

//Action Creators

const reducerName = 'adverts';
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const STOP_REQUEST = createActionName('STOP_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADVERTS = createActionName('LOAD_ADVERTS');

export const startRequest = () => ({ type: START_REQUEST });
export const stopRequest = () => ({ type: STOP_REQUEST });
export const errorRequest = (error) => ({ type: ERROR_REQUEST, payload: { error } });

export const loadAdverts = (adverts) => ({ type: LOAD_ADVERTS, payload: { adverts } });

//THUNKS

export const fetchAdverts = () => async (dispatch) => {
  dispatch(startRequest());
  try {
    let response = await axios.get(`${API_URL}/ads`);
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    dispatch(loadAdverts(response.data));
    dispatch(stopRequest());
  } catch (error) {
    dispatch(errorRequest(error));
  }
};

export const fetchAdvert = (id) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await fetch(`${API_URL}/ads/${id}`);
    const advert = await response.json();
    dispatch(loadAdverts(advert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
};

export const createAdvert = (advert) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await fetch(`${API_URL}/ads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(advert),
    });
    const newAdvert = await response.json();
    dispatch(loadAdverts(newAdvert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
};

export const updateAdvert = (advert) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await fetch(`${API_URL}/ads/${advert.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(advert),
    });
    const updatedAdvert = await response.json();
    dispatch(loadAdverts(updatedAdvert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
};

export const deleteAdvert = (id) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await fetch(`${API_URL}/ads/${id}`, {
      method: 'DELETE',
    });
    const deletedAdvert = await response.json();
    dispatch(loadAdverts(deletedAdvert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
};



// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case START_REQUEST:
      return {
        ...state,
        request: {
          pending: true,
          error: null,
          success: null,
        },
      };
    case STOP_REQUEST:
      return {
        ...state,
        request: {
          pending: false,
          error: null,
          success: true,
        },
      };
    case ERROR_REQUEST:
      return {
        ...state,
        request: {
          pending: false,
          error: action.payload.error,
          success: false,
        },
      };
    case LOAD_ADVERTS:
      return {
        ...state,
        data: [...action.payload.adverts],
      };
    default:
      return state;
  }
}
