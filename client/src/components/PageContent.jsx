import { useSelector } from 'react-redux';
import OptionsForm from './OptionsForm';
import RelevantCoverArts from './RelevantCoverArts';
import { Box, Typography } from '@mui/material';
import NewPlaylist from './NewPlaylist';

const PageContent = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions);
  const newPlaylist = useSelector(({ generatedPlaylist }) => generatedPlaylist);
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography sx={{ mt: 2 }} variant='h3'>{playlistInfo.title}</Typography>
      <RelevantCoverArts />
      <Typography sx={{ m: 1 }}>{playlistInfo.description}</Typography>
      <OptionsForm />
      {newPlaylist.generatePlaylist === true && <NewPlaylist />}
    </Box>
  )
}

export default PageContent;