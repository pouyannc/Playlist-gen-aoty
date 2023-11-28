import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: null,
  nrOfTracks: 0,
  generatePlaylist: false,
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
    }
  }
})

export const { setPlaylistId, setGeneratedNrOfTracks, setGeneratePlaylist } = generatedPlaylistSlice.actions;

export default generatedPlaylistSlice.reducer;
