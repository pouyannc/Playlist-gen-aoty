import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './App.css'
import axios from 'axios';
import { getUID } from './reducers/userReducer';
import { setTokens } from './services/user';
import { useSearchParams } from 'react-router-dom';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const uid = useSelector(({ user }) => user.spotifyUID);

  const url = 'http://localhost:3003/api'

  const [albums, setAlbums] = useState([]);

  const getAlbumsList = async () => {
    const accessToken = localStorage.getItem('access');
    const scrapeUrl = encodeURIComponent('https://www.albumoftheyear.org/releases/this-week/');
    const nrTracks = 20;
    const tracksPerAlbum = 3;
    console.log('Populating tracklist...')
    const tracklist = await axios.get(`${url}/tracklist?access_token=${accessToken}&scrape_url=${scrapeUrl}&nr_tracks=${nrTracks}&tracks_per=${tracksPerAlbum}`)
    const newPlaylist = await axios.post(`${url}/playlist/create?access_token=${accessToken}`, { uid: uid, playlistName: 'New generated list' });
    const playlistID = newPlaylist.data.id;
    console.log('created new playlist', playlistID)
    console.log(tracklist.data);
    await axios.post(`${url}/playlist/populate?access_token=${accessToken}`, { pid: playlistID, uris: tracklist.data });
    
    setAlbums(tracklist.data);
  }

  useEffect(() => {
    let accessToken = localStorage.getItem('access');
    let refreshToken = localStorage.getItem('refresh');

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      accessToken = urlParams.get('access_token');
      refreshToken = urlParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('setting tokens');
        setTokens(accessToken, refreshToken);

        searchParams.delete('access_token');
        searchParams.delete('refresh_token');
        setSearchParams(searchParams);
      }
    }
    
    console.log('setting uid')
    accessToken && dispatch(getUID());
  }, [])

  return (
    <>
      <a href={`${url}/login`}>Login with Spotify</a>
      <button type='button' onClick={getAlbumsList}>Generate List</button>
      <div>{albums.map((a) => <div key={Math.random()*9999}>{a}</div>)}</div>
    </>
  )
}

export default App
