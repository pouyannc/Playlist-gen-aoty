import axios from 'axios';

const serverUrl = 'http://localhost:3003/api'

const getTracklist = async (q) => {
  const {
    accessToken,
    scrapeUrl,
    tracksPerAlbum,
    nrOfTracks,
    sortReleases,
    returnType,
  } = q;
  const res = await axios.get(`${serverUrl}/tracklist?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrOfTracks}&tracks_per=${tracksPerAlbum}&sort=${sortReleases}&return_type=${returnType}`)
  return res.data;
}

const createPlaylist = async (req) => {
  const {
    accessToken,
    uid,
  } = req;
  const res = await axios.post(`${serverUrl}/playlist/create?access_token=${accessToken}`, { uid: uid, playlistName: 'New generated list' });
  return res.data;
}

const populatePlaylist = async (req) => {
  const {
    accessToken,
    playlistID,
    tracklist,
  } = req;
  const res = await axios.post(`${serverUrl}/playlist/populate?access_token=${accessToken}`, { pid: playlistID, uris: tracklist });
  return res.data;
}

export default { getTracklist, createPlaylist, populatePlaylist }