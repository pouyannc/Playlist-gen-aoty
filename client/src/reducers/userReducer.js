import { createSlice } from "@reduxjs/toolkit";
import { getSpotifyUID } from "../services/user";

const initialState = {
  spotifyUID: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUID(state, action) {
      return { ...state, spotifyUID: action.payload };
    },
    logout() {
      return initialState;
    }
  }
})

export const { setUID, logout } = userSlice.actions;

export const getUID = () => async (dispatch) => {
  const id = await getSpotifyUID();
  dispatch(setUID(id));
}

export default userSlice.reducer;