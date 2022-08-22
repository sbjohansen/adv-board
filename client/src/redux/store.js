import { configureStore } from '@reduxjs/toolkit';
import { getDefaultMiddleware} from '@reduxjs/toolkit';

// import reducers
import advertsReducer from './advertsRedux';
import usersReducer from './usersRedux';

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    adverts: advertsReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => customizedMiddleware

});

export default store;
