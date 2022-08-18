import { configureStore } from '@reduxjs/toolkit';

// import reducers
import advertsReducer from './advertsRedux';

export const store = configureStore({
  reducer: {
    adverts: advertsReducer,
  },
});

export default store;
