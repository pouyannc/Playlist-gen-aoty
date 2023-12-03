import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { getCoverUrls } from "../reducers/coverArtReducer";
import { Box, ImageListItem, ImageListItemBar, Paper, Skeleton, Snackbar } from "@mui/material";

const RelevantCoverArts = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const coverArtUrls = useSelector(({ coverArtUrls }) => coverArtUrls); 
  const dispatch = useDispatch();

  const currentPlaylistType = playlistInfo.type;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!coverArtUrls[currentPlaylistType]) {
      setOpen(true);
      const accessToken = localStorage.getItem('access');
      dispatch(getCoverUrls({ ...playlistInfo, tracksPerAlbum: 1, nrOfTracks: 6, returnType: 'cover', accessToken }));
    }
  }, [currentPlaylistType])

  return (
    <Box sx={{
      p: 2,
      display: 'grid',
      gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)" },
      justifyItems: "center",
      maxWidth: { xs: 400, sm: 800, lg: 900 }
    }} >
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={4000}
        message='Generating playlist preview'
        onClose={(e, reason) => reason !== 'clickaway' && setOpen(false)}
      />
      {(!Array.isArray(coverArtUrls[currentPlaylistType]) ? Array.from(new Array(6)) : coverArtUrls[currentPlaylistType]).map((album) => (
        <Paper key={uuidv4()} elevation={10} sx={{ m: 0.8, bgcolor: "gray" }}>
          {album ? (
            <ImageListItem sx={{ p: 0.6 }}>
              <img src={album.src} />
              <ImageListItemBar subtitle={album.artist} sx={{ m: 0.8, height: '14%' }} />
            </ImageListItem>     
            ) : (
              <Skeleton sx={{ width: { xs: 160, sm: 240, lg: 300 }, height: { xs: 160, sm: 240, lg: 300 } }} animation='wave' variant="rounded" />
            )
          }
        </Paper>
      ))}
    </Box>
  )
}

export default RelevantCoverArts
