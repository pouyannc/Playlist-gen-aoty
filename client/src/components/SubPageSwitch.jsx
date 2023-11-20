import { useDispatch, useSelector } from 'react-redux'
import { initRecent, switchCurrentYear, switchRecentYears } from '../reducers/playlistReducer';

const SubPageSwitch = () => {
  const currentYear = new Date().getFullYear();

  const contentCategory = useSelector(({ playlistOptions }) => playlistOptions.category);
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'months') dispatch(initRecent());
    else if (type === currentYear) dispatch(switchCurrentYear());
    else if (type === 'years') dispatch(switchRecentYears());
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
          <button>must-hear</button>
          <button>popular</button>
        </div>
      </div>
  )
}

export default SubPageSwitch