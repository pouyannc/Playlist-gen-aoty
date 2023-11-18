import axios from 'axios';
import refreshSessionIfNeeded from '../util/checkAndRefreshSession.ja';

const serverUrl = 'http://localhost:3003/api'

const getTracklist = async (q) => {
  await refreshSessionIfNeeded();
  const {
    accessToken,
    scrapeUrl,
    tracksPerAlbum,
    nrOfTracks,
    type,
    returnType,
  } = q;
  const res = await axios.get(`${serverUrl}/tracklist?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrOfTracks}&tracks_per=${tracksPerAlbum}&type=${type}&return_type=${returnType}`)
  return res.data;
}

const createPlaylist = async (req) => {
  await refreshSessionIfNeeded();
  const {
    accessToken,
    uid,
  } = req;
  const res = await axios.post(`${serverUrl}/playlist/create?access_token=${accessToken}`, { uid: uid, playlistName: 'New generated list' });
  return res.data;
}

const populatePlaylist = async (req) => {
  await refreshSessionIfNeeded();
  const {
    accessToken,
    playlistID,
    tracklist,
  } = req;
  const res = await axios.post(`${serverUrl}/playlist/populate?access_token=${accessToken}`, { pid: playlistID, uris: tracklist });
  return res.data;
}

export default { getTracklist, createPlaylist, populatePlaylist }