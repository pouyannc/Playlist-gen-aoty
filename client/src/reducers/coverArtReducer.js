import { createSlice } from '@reduxjs/toolkit';
import coverArtsService from '../services/coverArts';

const initialState = {};

const coverArtSlice = createSlice({
  name: 'coverArt',
  initialState,
  reducers: {
    setCoverUrls(state, action) {
      const { type, coverUrls } = action.payload;
      return { ...state, [type]: coverUrls };
    }
  }
})

export const { setCoverUrls } = coverArtSlice.actions;

export const getCoverUrls = (params) => async (dispatch) => {
  const coverUrls = await coverArtsService.getCoverArts(params);
  dispatch(setCoverUrls({ type: params.type, coverUrls }));
}

export default coverArtSlice.reducer;