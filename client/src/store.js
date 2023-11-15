import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import playlistReducer from './reducers/playlistReducer';
import coverArtReducer from './reducers/coverArtReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    playlistOptions: playlistReducer,
    coverArtUrls: coverArtReducer,
  }
})

export default store;