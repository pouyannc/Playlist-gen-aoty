import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v4 as uuidv4 } from 'uuid';
import { getCoverUrls } from "../reducers/coverArtReducer";
import Loader from "./Loader";

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
    !coverArtUrls[currentPlaylistType] ?
      <Loader loadingMsg="Loading preview..." /> :
      <div>
        {coverArtUrls[currentPlaylistType].map((src) => (<img key={uuidv4()} src={src} />))}
      </div>
  )
}

export default RelevantCoverArts