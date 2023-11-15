import { createSlice } from "@reduxjs/toolkit";

const d = new Date();
const currentYear = d.getFullYear();
const currentMonth = d.getMonth();
const month = ["january","february","march","april","may","june","july","august","september","october","november","december"];

console.log(month[currentMonth], currentMonth);

const initialState = {
  category: 'new',
  type: 'new',
  title: 'New Releases',
  description: 'Generate a playlist to sample this weeks most popular releases',
  tracksPerAlbum: 2,
  nrOfTracks: 20,
  scrapeUrl: encodeURIComponent('https://www.albumoftheyear.org/releases/this-week/'),
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
        category: 'recent',
        type: 'months',
        title: 'Recent Months',
        description: 'Generate a compilation of tracks from the must-hear albums of the last four months',
        tracksPerAlbum: 1,
        nrOfTracks: 30,
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/${month[currentMonth]}-${currentMonth+1}.php?type=lp&s=user&reviews=500`),
        sortReleases: false,
      }
    },
    switchCurrentYear(state) {
      return {
        ...state,
        type: currentYear,
        title: currentYear,
        description: `Generate a compilation of tracks from the must-hear albums of ${currentYear}`,
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/?type=lp&s=user&reviews=500`),
      }
    },
    switchRecentYears(state) {
      return {
        ...state,
        type: 'years',
        title: 'Recent Years',
        description: 'Generate a compilation of tracks from the must-hear albums of the last three years',
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/?type=lp&s=user&reviews=500`),
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

export const { initNew, initRecent, switchCurrentYear, switchRecentYears, setTracksPerAlbum, setNrOfTracks } = playlistOptionsSlice.actions;

export default playlistOptionsSlice.reducer;
