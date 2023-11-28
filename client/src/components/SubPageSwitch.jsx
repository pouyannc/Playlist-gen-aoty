import { useDispatch, useSelector } from 'react-redux'
import { initRecent, setSort, switchCurrentYear, switchRecentYears } from '../reducers/playlistOptionsReducer';
import { Box, Tab, Tabs } from '@mui/material';

const SubPageSwitch = () => {
  const currentYear = new Date().getFullYear();

  const playlistInfo = useSelector(({ playlistOptions }) => playlistOptions);
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'months') dispatch(initRecent());
    else if (type === currentYear) dispatch(switchCurrentYear());
    else if (type === 'years') dispatch(switchRecentYears());
  }
  
  const handleSortSwitch = (type) => {
    if (type === 'must-hear') dispatch(setSort('rating'));
    else if (type === 'popular') dispatch(setSort('popular'));
  }

  return (
    playlistInfo.category === 'recent' &&  
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={playlistInfo.type.split('/')[0]} centered>
          <Tab value='months' label='Months' onClick={() => handlePageSwitch('months')} />
          <Tab value={currentYear.toString()} label={currentYear} onClick={() => handlePageSwitch(currentYear)} />
          <Tab value='years' label='Years' onClick={() => handlePageSwitch('years')} />
        </Tabs>
        <Tabs value={playlistInfo.type.split('/')[1]} centered>
          <Tab value='rating' label='Must-Hear' onClick={() => handleSortSwitch('must-hear')} />
          <Tab value='popular' label='Popular' onClick={() => handleSortSwitch('popular')} />
        </Tabs>
      </Box>
  )
}

export default SubPageSwitch