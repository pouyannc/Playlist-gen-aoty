import { useDispatch, useSelector } from 'react-redux'
import { initNew, initRecent } from '../reducers/playlistReducer';
import { Box, Tab, Tabs } from '@mui/material';

const PageSwitch = () => {
  const playlistCat = useSelector(({ playlistOptions }) => playlistOptions.category)
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'new') dispatch(initNew());
    else if (type === 'recent') dispatch(initRecent());
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
