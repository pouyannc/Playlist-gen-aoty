import { createSlice } from '@reduxjs/toolkit';
import coverArtsService from '../services/coverArts';

// const initialState = {
//   new: [],
//   months: [],
//   currentYear: [],
//   years: [],
// }

const coverArtSlice = createSlice({
  name: 'coverArt',
  initialState: [],
  reducers: {
    setCoverUrls(state, action) {
      return action.payload;
    }
  }
})

export const { setCoverUrls } = coverArtSlice.actions;

export const getCoverUrls = (params) => async (dispatch) => {
  const coverUrls = await coverArtsService.getCoverArts(params);
  dispatch(setCoverUrls(coverUrls));
}

export default coverArtSlice.reducer;