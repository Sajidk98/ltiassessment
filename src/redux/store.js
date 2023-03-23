import { configureStore } from '@reduxjs/toolkit';
import userReducer  from './userReducer';
import eventReducer from './eventReducer';

export default configureStore({
  reducer: {
    users: userReducer ,
    events: eventReducer
  },
});