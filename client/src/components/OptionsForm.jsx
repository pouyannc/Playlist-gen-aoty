import { useDispatch, useSelector } from "react-redux"
import { setGenre, setNrOfTracks, setTracksPerAlbum } from "../reducers/playlistReducer"
import playlistService from '../services/playlist';

const OptionsForm = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const uid = useSelector(({ user }) => user.spotifyUID);
  const dispatch = useDispatch();

  const controlGenre = playlistInfo.type.split('/')[2];

  const getAlbumsList = async (e) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('access');
    console.log('Generating tracklist...')
    const tracklist = await playlistService.getTracklist({ accessToken, ...playlistInfo, returnType: 'uri' });

    if (tracklist.length < playlistInfo.nrOfTracks) console.log('Looks like there were not enough tracks in this category to meet the requested playlist length');

    // console.log('Creating new playlist for spotify user...')
    // const newPlaylist = await playlistService.createPlaylist({ accessToken, uid });
    // const playlistID = newPlaylist.id;
    // console.log('created new playlist', playlistID)
    // console.log(tracklist);
    // console.log('Populating the playlist...')
    // await playlistService.populatePlaylist({ accessToken, playlistID, tracklist })
  }

  const handleGenreChange = (e) => {
    console.log('switching to genre: ', e.target.value);
    dispatch(setGenre(e.target.value));
  }

  return (
    <div>
      <form onSubmit={getAlbumsList}>
        <label htmlFor="genres">Genre:</label>
        <select id="genres" value={controlGenre} onChange={handleGenreChange}>
          <option value="all">All</option>
          <option value="pop">Pop</option>
          <option value="rock">Rock</option>
          <option value="hiphop">Hip Hop</option>
          <option value="electronic">Electronic</option>
          <option value="indierock">Indie Rock</option>
          <option value="dance">Dance</option>
          <option value="rb">R&B</option>
          <option value="singersongwriter">Singer-Songwriter</option>
          <option value="metal">Metal</option>
          <option value="trap">Trap</option>
        </select>
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