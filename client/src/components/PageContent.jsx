import { useSelector } from 'react-redux';
import OptionsForm from './OptionsForm';
import RelevantCoverArts from './RelevantCoverArts';
import { Typography } from '@mui/material';

const PageContent = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  
  return (
    <div>
      <Typography variant='h2'>{playlistInfo.title}</Typography>
      <RelevantCoverArts />
      <Typography>{playlistInfo.description}</Typography>
      <OptionsForm />
    </div>
  )
}

export default PageContent;