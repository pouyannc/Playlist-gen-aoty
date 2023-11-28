import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import playlistOptionsReducer from './reducers/playlistOptionsReducer';
import coverArtReducer from './reducers/coverArtReducer';
import generatedPlaylistReducer from './reducers/generatedPlaylistReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
    playlistOptions: playlistOptionsReducer,
    coverArtUrls: coverArtReducer,
    generatedPlaylist: generatedPlaylistReducer,
  }
})

export default store;