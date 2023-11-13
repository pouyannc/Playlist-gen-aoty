import { useSelector } from 'react-redux';
import axios from 'axios';

const PageContent = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const uid = useSelector(({ user }) => user.spotifyUID);

  const serverUrl = 'http://localhost:3003/api'

  const getAlbumsList = async () => {
    const accessToken = localStorage.getItem('access');
    const {
      scrapeUrl,
      tracksPerAlbum,
      nrOfTracks,
      sortReleases,
    } = playlistInfo;
    console.log('Populating tracklist...')
    const tracklist = await axios.get(`${serverUrl}/tracklist?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrOfTracks}&tracks_per=${tracksPerAlbum}&sort=${sortReleases}`)

    // console.log('Creating new playlist for spotify user...')
    // const newPlaylist = await axios.post(`${url}/playlist/create?access_token=${accessToken}`, { uid: uid, playlistName: 'New generated list' });
    // const playlistID = newPlaylist.data.id;
    // console.log('created new playlist', playlistID)
    // console.log(tracklist.data);
    // console.log('Populating the playlist...')
    // await axios.post(`${url}/playlist/populate?access_token=${accessToken}`, { pid: playlistID, uris: tracklist.data });
  }

  return (
    <div>
      <h2>{playlistInfo.title}</h2>
      <button type='button' onClick={getAlbumsList}>Generate List</button>
    </div>
  )
}

export default PageContent;