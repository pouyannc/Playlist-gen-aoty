import { useSelector } from 'react-redux';
import OptionsForm from './OptionsForm';
import RelevantCoverArts from './RelevantCoverArts';
import { Typography } from '@mui/material';
import NewPlaylist from './NewPlaylist';

const PageContent = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions);
  const newPlaylist = useSelector(({ generatedPlaylist }) => generatedPlaylist);
  
  return (
    <div>
      <Typography sx={{ mt: 2 }} variant='h2'>{playlistInfo.title}</Typography>
      <RelevantCoverArts />
      <Typography sx={{ m: 1 }}>{playlistInfo.description}</Typography>
      <OptionsForm />
      {newPlaylist.generatePlaylist === true && <NewPlaylist />}
    </div>
  )
}

export default PageContent;