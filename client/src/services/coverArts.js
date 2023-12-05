import axios from 'axios';
import refreshSessionIfNeeded from '../util/checkAndRefreshSession.ja';

const serverUrl = '/api/tracklist';

const getCoverArts = async (q) => {
  await refreshSessionIfNeeded();
  const {
    accessToken,
    scrapeUrl,
    tracksPerAlbum,
    nrOfTracks,
    returnType,
    type
  } = q;
  const res = await axios.get(`${serverUrl}?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrOfTracks}&tracks_per=${tracksPerAlbum}&return_type=${returnType}&type=${type}`)
  return res.data;
}

export default { getCoverArts }; 
