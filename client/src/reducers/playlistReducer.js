import { createSlice } from "@reduxjs/toolkit";

const d = new Date();
const currentYear = d.getFullYear();
const currentMonth = d.getMonth();
const month = ["january","february","march","april","may","june","july","august","september","october","november","december"];
const genres = {
  pop: 15,
  rock: 7,
  hiphop: 3,
  electronic: 6,
  dance: 132,
  metal: 40,
  rb: 22,
  singersongwriter: 37,
  trap: 213,
  indierock: 1,
}

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
        type: 'months/rating/all',
        title: 'Recent Months',
        description: 'Generate a compilation of tracks from the must-hear albums of the last four months',
        tracksPerAlbum: 1,
        nrOfTracks: 30,
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/${month[currentMonth]}-${currentMonth+1}.php?type=lp&s=user&reviews=500`),
      }
    },
    switchCurrentYear(state) {
      return {
        ...state,
        type: `${currentYear}/rating/all`,
        title: currentYear,
        description: `Generate a compilation of tracks from the must-hear albums of ${currentYear}`,
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/?type=lp&s=user&reviews=500`),
      }
    },
    switchRecentYears(state) {
      return {
        ...state,
        type: 'years/rating/all',
        title: 'Recent Years',
        description: 'Generate a compilation of tracks from the must-hear albums of the last three years',
        scrapeUrl: encodeURIComponent(`https://www.albumoftheyear.org/${currentYear}/releases/?type=lp&s=user&reviews=500`),
      }
    },
    setSort(state, action) {
      const newUrl = new URL(decodeURIComponent(state.scrapeUrl));
      if (action.payload === 'popular') {
        newUrl.searchParams.delete('s');
        newUrl.searchParams.delete('reviews');
      } else if (action.payload === 'rating') {
        newUrl.searchParams.set('s', 'user');
        newUrl.searchParams.set('reviews', '500');
      }
      let newType = state.type.split('/');
      newType[1] = action.payload;
      newType = newType.join('/');
      return { ...state, type: newType, scrapeUrl: encodeURIComponent(newUrl.href) };
    },
    setGenre(state, action) {
      const newUrl = new URL(decodeURIComponent(state.scrapeUrl));
      const genreParam = genres[action.payload.toLowerCase()];
      if (genreParam){
        newUrl.searchParams.set('genre', genreParam);
        newUrl.searchParams.set('reviews', 100);
      } else {
        newUrl.searchParams.delete('genre');
      }
      let newType = state.type.split('/');
      newType[2] = action.payload;
      newType = newType.join('/');
      return { ...state, type: newType, scrapeUrl: encodeURIComponent(newUrl.href) };
    },
    setTracksPerAlbum(state, action) {
      return { ...state, tracksPerAlbum: parseInt(action.payload) || 0 }
    },
    setNrOfTracks(state, action) {
      return { ...state, nrOfTracks: parseInt(action.payload) || 0 }
    }
  }
})

export const { initNew, initRecent, switchCurrentYear, switchRecentYears, setTracksPerAlbum, setNrOfTracks, setGenre, setSort } = playlistOptionsSlice.actions;

export default playlistOptionsSlice.reducer;
