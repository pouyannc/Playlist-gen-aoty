import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: null,
  name: {
    genre: '',
    sort: '',
  },
  nrOfTracks: 0,
  generatePlaylist: false,
  notEnoughTracks: false,
}

const generatedPlaylistSlice = createSlice({
  name: 'generatedPlaylist',
  initialState,
  reducers: {
    setPlaylistId(state, action) {
      return {...state, id: action.payload}
    },
    setGeneratedNrOfTracks(state, action) {
      return {...state, nrOfTracks: action.payload}
    },
    setGeneratePlaylist(state, action) {
      return {...state, generatePlaylist: action.payload}
    },
    setNotEnoughTracks(state, action) {
      return {...state, notEnoughTracks: action.payload}
    },
    setPlaylistNameGenre(state, action) {
      let genreName = '';
      if (action.payload !== 'all') {
        genreName = action.payload.charAt(0).toUpperCase() + action.payload.slice(1);
      }
      return {...state, name: {...state.name, genre: genreName}}
    },
    setPlaylistNameSort(state, action) {
      return {...state, name: {...state.name, sort: action.payload}}
    }
  }
})

export const { setPlaylistId, setGeneratedNrOfTracks, setGeneratePlaylist, setNotEnoughTracks, setPlaylistNameGenre, setPlaylistNameSort } = generatedPlaylistSlice.actions;

export default generatedPlaylistSlice.reducer;
