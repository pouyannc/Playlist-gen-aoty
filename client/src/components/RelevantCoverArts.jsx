import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCoverUrls } from "../reducers/coverArtReducer";

const RelevantCoverArts = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  const coverArtUrls = useSelector(({ coverArtUrls }) => coverArtUrls);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem('access');
    dispatch(getCoverUrls({ ...playlistInfo, tracksPerAlbum: 1, nrOfTracks: 6, returnType: 'cover', accessToken }));
  }, [playlistInfo])

  console.log(coverArtUrls)

  return (
    <div>
      {coverArtUrls.map((src) => (<img src={src} />))}
    </div>
  )
}

export default RelevantCoverArts