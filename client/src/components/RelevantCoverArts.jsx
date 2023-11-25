import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { getCoverUrls } from "../reducers/coverArtReducer";
import { ImageList, ImageListItem, ImageListItemBar, Paper, Skeleton } from "@mui/material";

const RelevantCoverArts = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const coverArtUrls = useSelector(({ coverArtUrls }) => coverArtUrls);
  const dispatch = useDispatch();

  const currentPlaylistType = playlistInfo.type;

  useEffect(() => {
    if (!coverArtUrls[currentPlaylistType]) {
      const accessToken = localStorage.getItem('access');
      dispatch(getCoverUrls({ ...playlistInfo, tracksPerAlbum: 1, nrOfTracks: 6, returnType: 'cover', accessToken }));
    }
  }, [currentPlaylistType])

  return (
    <ImageList sx={{ maxWidth: 760, p: 2 }} cols={3}>
      {(!Array.isArray(coverArtUrls[currentPlaylistType]) ? Array.from(new Array(6)) : coverArtUrls[currentPlaylistType]).map((album) => (
        <Paper key={uuidv4()} elevation={10} sx={{ m: 0.8, width: 200, height: 200, bgcolor: "gray" }}>
          {album ? (
            <ImageListItem sx={{ p: 0.6 }}>
              <img src={album.src} />
              <ImageListItemBar subtitle={album.artist} sx={{ m: 0.8, height: '14%' }} />
            </ImageListItem>     
            ) : (
              <Skeleton animation='wave' variant="rounded" width={200} height={200} />
            )
          }
        </Paper>
      ))}
    </ImageList>
  )
}

export default RelevantCoverArts

// !coverArtUrls[currentPlaylistType] ?
//       <Loader loadingMsg="Loading preview..." /> :