import axios from 'axios';
import { API_URL } from '../config';
import initialState from './initialState';
import shortid from 'shortid';
//Selectors
export const getAdverts = ({ adverts }) => adverts.data;
export const getRequest = ({ adverts }) => adverts.request;
export const getAdvertById = ({ adverts }, id) => adverts.data.find((advert) => advert.id === id);
//Action Creators

const reducerName = 'adverts';
const createActionName = (name) => `app/${reducerName}/${name}`;

const START_REQUEST = createActionName('START_REQUEST');
const STOP_REQUEST = createActionName('STOP_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const LOAD_ADVERTS = createActionName('LOAD_ADVERTS');
const LOAD_ADVERT = createActionName('LOAD_ADVERT');
const ADD_AD = createActionName('ADD_AD');
const REMOVE_AD = createActionName('REMOVE_AD');
const UPDATE_AD = createActionName('UPDATE_AD');
const SEARCH_ADVERTS = createActionName('SEARCH_ADVERTS');

export const startRequest = () => ({ type: START_REQUEST });
export const stopRequest = () => ({ type: STOP_REQUEST });
export const errorRequest = (error) => ({ type: ERROR_REQUEST, payload: { error } });

export const loadAdverts = (adverts) => ({ type: LOAD_ADVERTS, payload: { adverts } });
export const loadAdvert = (advert) => ({ type: LOAD_ADVERT, payload: { advert } });
export const addAd = (payload) => ({ type: ADD_AD, payload });
export const removeAd = (id) => ({ type: REMOVE_AD, payload: { id } });
export const updateAd = (payload) => ({ type: UPDATE_AD, payload });
export const searchAd = (searchPhase) => ({ type: SEARCH_ADVERTS, payload: { searchPhase } });
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
    let response = await axios.get(`${API_URL}/ads/${id}`);
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    dispatch(loadAdvert(response.data));
    dispatch(stopRequest());
  } catch (error) {
    dispatch(errorRequest(error));
  }
}

export const addAdvert = (advert) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await axios.post(`${API_URL}/ads`, advert);
      
    const newAdvert = await response.json();
    dispatch(addAd(newAdvert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
} 

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
    dispatch(removeAd(id));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
}

export const fetchAdvertBySearchPhase = (searchPhase) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await axios.get(`${API_URL}/ads/search/${searchPhase}`);
    await new Promise((resolve, reject) => setTimeout(resolve, 2000));
    dispatch(loadAdverts(response.data));
    dispatch(stopRequest());
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(stopRequest());
  }
}




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
    case LOAD_ADVERT:
      return {
        ...state,
        data: [...state.data.filter((advert) => advert.id !== action.payload.advert.id), action.payload.advert],
      };
      case SEARCH_ADVERTS:
      return {
        ...state,
        data: [...state.data.filter((advert) => advert.title.includes(action.payload.searchPhase))],
      };
      case ADD_AD:
        return [...state, { ...action.payload, id: shortid() }];
      case REMOVE_AD:
        return [...state.filter((advert) => advert.id !== action.payload.id)];
      case UPDATE_AD:
        return [...state.map((advert) => (advert.id === action.payload.id ? action.payload : advert))];
    default:
      return state;
  }
}
