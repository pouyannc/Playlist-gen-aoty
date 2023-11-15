import { useSelector } from 'react-redux';
import OptionsForm from './OptionsForm';
import RelevantCoverArts from './RelevantCoverArts';

const PageContent = () => {
  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions)
  
  return (
    <div>
      <h2>{playlistInfo.title}</h2>
      <RelevantCoverArts />
      <OptionsForm />
    </div>
  )
}

export default PageContent;