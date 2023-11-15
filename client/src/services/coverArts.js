import axios from 'axios';

const serverUrl = 'http://localhost:3003/api/tracklist';

const getCoverArts = async (q) => {
  const {
    accessToken,
    scrapeUrl,
    tracksPerAlbum,
    nrOfTracks,
    sortReleases,
    returnType,
    type
  } = q;
  const res = await axios.get(`${serverUrl}?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrOfTracks}&tracks_per=${tracksPerAlbum}&sort=${sortReleases}&return_type=${returnType}&type=${type}`)
  return res.data;
}

export default { getCoverArts }; 
