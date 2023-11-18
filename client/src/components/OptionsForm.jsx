import { useDispatch, useSelector } from "react-redux"
import { setNrOfTracks, setTracksPerAlbum } from "../reducers/playlistReducer"
import playlistService from '../services/playlist';

const OptionsForm = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const uid = useSelector(({ user }) => user.spotifyUID);
  const dispatch = useDispatch();

  const getAlbumsList = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('access');
    console.log('Generating tracklist...')
    const tracklist = await playlistService.getTracklist({ accessToken, ...playlistInfo, returnType: 'uri' });

    // console.log('Creating new playlist for spotify user...')
    // const newPlaylist = await playlistService.createPlaylist({ accessToken, uid });
    // const playlistID = newPlaylist.id;
    // console.log('created new playlist', playlistID)
    // console.log(tracklist);
    // console.log('Populating the playlist...')
    // await playlistService.populatePlaylist({ accessToken, playlistID, tracklist })
  }

  return (
    <div>
      <form onSubmit={getAlbumsList}>
        <label htmlFor="nrOfTracks">Number of Tracks: </label>
        <input id="nrOfTracks" type="number" min={10} max={40} value={playlistInfo.nrOfTracks} onChange={(e) => dispatch(setNrOfTracks(e.target.value))} />
        <label htmlFor="tracksPerAlbum">Tracks per Album: </label>
        <input id="tracksPerAlbum" type="number" min={1} max={3} value={playlistInfo.tracksPerAlbum} onChange={(e) => dispatch(setTracksPerAlbum(e.target.value))} />
        <button type='submit'>Generate List</button>
      </form>
    </div>
  )
}

export default OptionsForm;