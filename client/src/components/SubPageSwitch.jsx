import { useDispatch, useSelector } from 'react-redux'
import { initRecent, setSort, switchCurrentYear, switchRecentYears } from '../reducers/playlistReducer';
import { Button } from '@mui/material';

const SubPageSwitch = () => {
  const currentYear = new Date().getFullYear();

  const contentCategory = useSelector(({ playlistOptions }) => playlistOptions.category);
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
    contentCategory === 'recent' &&  
      <div>
        <div>
          <Button onClick={() => handlePageSwitch('months')}>months</Button>
          <Button onClick={() => handlePageSwitch(currentYear)}>{currentYear}</Button>
          <Button onClick={() => handlePageSwitch('years')}>years</Button>
        </div>
        <div>
          <Button onClick={() => handleSortSwitch('must-hear')}>must-hear</Button>
          <Button onClick={() => handleSortSwitch('popular')}>popular</Button>
        </div>
      </div>
  )
}

export default SubPageSwitch