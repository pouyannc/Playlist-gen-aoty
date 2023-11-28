import { Box, LinearProgress, Typography } from "@mui/material";
import { useSelector } from "react-redux"

const NewPlaylist = () => {
  const newPlaylist = useSelector(({ generatedPlaylist }) => generatedPlaylist);
  const requestedNrOfTracks = useSelector(({ playlistOptions }) => playlistOptions.nrOfTracks);

  return (
    !newPlaylist.nrOfTracks > 0 ?
      <LinearProgress sx={{ mb: 6 }} /> :
      <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>The playlist has been generated and added to your Spotify account.</Typography>
        {
          requestedNrOfTracks > newPlaylist.nrOfTracks &&
            <Typography variant="subtitle1" gutterBottom>*It seems there weren&apos;t enough tracks to meet the requested playlist length. Choosing a lower album diversity might solve this.</Typography>
        }
        <iframe
          style={{ borderRadius: '12px', border: 'none' }}
          src={`https://open.spotify.com/embed/playlist/${newPlaylist.id}?utm_source=generator`}
          width="100%"
          height="380"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy">
        </iframe>
      </Box>
  )
}

export default NewPlaylist