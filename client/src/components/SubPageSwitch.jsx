import { useDispatch, useSelector } from 'react-redux'
import { initRecent, setSort, switchCurrentYear, switchRecentYears } from '../reducers/playlistReducer';

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
          <button onClick={() => handlePageSwitch('months')}>months</button>
          <button onClick={() => handlePageSwitch(currentYear)}>{currentYear}</button>
          <button onClick={() => handlePageSwitch('years')}>years</button>
        </div>
        <div>
          <button onClick={() => handleSortSwitch('must-hear')}>must-hear</button>
          <button onClick={() => handleSortSwitch('popular')}>popular</button>
        </div>
      </div>
  )
}

export default SubPageSwitch