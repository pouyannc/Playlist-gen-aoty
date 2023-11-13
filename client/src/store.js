import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import playlistReducer from './reducers/playlistReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    playlistOptions: playlistReducer,
  }
})

export default store;