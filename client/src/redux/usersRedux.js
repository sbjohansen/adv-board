import { API_URL } from '../config';
import axios from 'axios';


const createActionName = (actionName) => `app/users/${actionName}`;
export const getUser = ({ users }) => users;

const LOG_IN = createActionName('LOG_IN');
const LOG_OUT = createActionName('LOG_OUT');
const START_REQUEST = createActionName('START_REQUEST');
const STOP_REQUEST = createActionName('STOP_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const startRequest = () => ({ type: START_REQUEST });
export const stopRequest = () => ({ type: STOP_REQUEST });
export const errorRequest = (error) => ({ type: ERROR_REQUEST, payload: { error } });

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const logOut = () => ({ type: LOG_OUT });

export const fetchUser = () => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await axios.get(`${API_URL}/auth/user`);
    const user = response.data;
    dispatch(logIn({user}));
  } catch (error) {
    dispatch(errorRequest(error));
  }
};

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case LOG_IN:
      return action.payload;
    case LOG_OUT:
      return null;
    default:
      return state;
  }
};

export default usersReducer;
