import { useDispatch, useSelector } from "react-redux"
import { setGenre, setNrOfTracks, setTracksPerAlbum } from "../reducers/playlistReducer"
import playlistService from '../services/playlist';
import { Box, Button, FormControl, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";

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
    dispatch(setGenre(e.target.value));
  }

  const handleLengthChange = (e) => {
    dispatch(setNrOfTracks(e.target.value));
  }

  const handleDiversityChange = (e) => {
    dispatch(setTracksPerAlbum(e.target.value));
  }

  return (
    <Box >
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <FormGroup>
          <Box sx={{ }}>
            {playlistInfo.category === 'recent' &&
              <FormControl sx={{ m: 1, minWidth: 150 }}>
                <InputLabel id="genres">Genre</InputLabel>
                <Select labelId="genres" value={controlGenre} label='Genre' onChange={handleGenreChange}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="pop">Pop</MenuItem>
                  <MenuItem value="rock">Rock</MenuItem>
                  <MenuItem value="hiphop">Hip Hop</MenuItem>
                  <MenuItem value="electronic">Electronic</MenuItem>
                  <MenuItem value="indierock">Indie Rock</MenuItem>
                  <MenuItem value="dance">Dance</MenuItem>
                  <MenuItem value="rb">R&B</MenuItem>
                  <MenuItem value="singersongwriter">Singer-Songwriter</MenuItem>
                  <MenuItem value="metal">Metal</MenuItem>
                  <MenuItem value="trap">Trap</MenuItem>
                </Select>
              </FormControl>
            }
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="nrOfTracks">Length</InputLabel>
              <Select labelId="nrOfTracks" value={playlistInfo.nrOfTracks} label='Length' onChange={handleLengthChange}>
                <MenuItem value={10}>10 Tracks</MenuItem>
                <MenuItem value={20}>20 Tracks</MenuItem>
                <MenuItem value={30}>30 Tracks</MenuItem>
                <MenuItem value={40}>40 Tracks</MenuItem>
                <MenuItem value={50}>50 Tracks</MenuItem>
                <MenuItem value={60}>60 Tracks</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 150 }}>
              <InputLabel id="tracksPerAlbum">Album Diversity</InputLabel>
              <Select labelId="tracksPerAlbum" value={playlistInfo.tracksPerAlbum} label='Diversity' onChange={handleDiversityChange}>
                <MenuItem value={1}>High</MenuItem>
                <MenuItem value={2}>Medium</MenuItem>
                <MenuItem value={3}>Low</MenuItem>
                <MenuItem value={4}>Very Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Button onSubmit={getAlbumsList}>Generate List</Button>
        </FormGroup>
      </form>
    </Box>
  )
}

export default OptionsForm;