import { useDispatch, useSelector } from 'react-redux'
import { initNew, initRecent } from '../reducers/playlistOptionsReducer';
import { Box, Tab, Tabs } from '@mui/material';
import { setPlaylistNameGenre, setPlaylistNameSort } from '../reducers/generatedPlaylistReducer';

const PageSwitch = () => {
  const playlistCat = useSelector(({ playlistOptions }) => playlistOptions.category)
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'new') {
      dispatch(initNew());
      dispatch(setPlaylistNameSort(''));
      dispatch(setPlaylistNameGenre(''));
    }
    else if (type === 'recent') {
      dispatch(initRecent());
      dispatch(setPlaylistNameSort('Must-Hear'))
    }
  }

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs value={playlistCat} centered>
        <Tab value='new' label='New' onClick={() => handlePageSwitch('new')}/>
        <Tab value='recent' label='Recent' onClick={() => handlePageSwitch('recent')}/>
      </Tabs>
    </Box>
  )
}

export default PageSwitch
