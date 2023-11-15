import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  type: 'new',
  title: 'New Releases',
  tracksPerAlbum: 2,
  nrOfTracks: 20,
  scrapeUrl: encodeURIComponent('https://www.albumoftheyear.org/releases/this-week/'),
  sortReleases: true,
};

const playlistOptionsSlice = createSlice({
  name: 'playlistOptions',
  initialState,
  reducers: {
    initNew() {
    return initialState;
    },
    initRecent() {
      return {
        type: 'recent',
        title: 'Recent Albums',
        tracksPerAlbum: 1,
        nrOfTracks: 30,
        scrapeUrl: encodeURIComponent('https://www.albumoftheyear.org/2023/releases/?type=lp&s=user&reviews=500'),
        sortReleases: false,
      }
    },
    setTracksPerAlbum(state, action) {
      return { ...state, tracksPerAlbum: parseInt(action.payload) || 0 }
    },
    setNrOfTracks(state, action) {
      return { ...state, nrOfTracks: parseInt(action.payload) || 0 }
    }
  }
})

export const { initNew, initRecent, setTracksPerAlbum, setNrOfTracks } = playlistOptionsSlice.actions;

export default playlistOptionsSlice.reducer;
