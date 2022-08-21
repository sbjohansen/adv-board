import { configureStore } from '@reduxjs/toolkit';

// import reducers
import advertsReducer from './advertsRedux';
import usersReducer from './usersRedux';

export const store = configureStore({
  reducer: {
    adverts: advertsReducer,
    users: usersReducer,
  },
});

export default store;
