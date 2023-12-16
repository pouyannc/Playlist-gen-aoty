import { Box, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux"
import scrollToBottom from "../util/scrollToBottom";

const NewPlaylist = () => {
  const newPlaylist = useSelector(({ generatedPlaylist }) => generatedPlaylist);

  useEffect(() => {
    scrollToBottom();
  }, [newPlaylist.generatePlaylist, newPlaylist.nrOfTracks])

  return (
    !newPlaylist.nrOfTracks > 0 ?
      <LinearProgress sx={{ mb: 6, width: '70%' }} /> :
      <Box sx={{ borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>{localStorage.getItem('refresh') !== 'null' ? 
          "The playlist has been generated and added to your Spotify account." :
          "The playlist has been generated. Make sure to save the playlist by clicking the + button! "}
          <a target="_blank" rel="noopener noreferrer" style={{ color: 'lightgreen' }} href={`https://open.spotify.com/playlist/${newPlaylist.id}`}>Click here to open on Spotify</a>
        </Typography>
        {
          newPlaylist.notEnoughTracks &&
            <Typography variant="subtitle1" gutterBottom>*It seems there weren&apos;t enough tracks to meet the requested playlist length. Choosing a lower album diversity might solve this.</Typography>
        }
        <iframe
          title="new playlist embed"
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