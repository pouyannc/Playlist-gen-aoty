import { useDispatch } from 'react-redux'
import { initNew, initRecent } from '../reducers/playlistReducer';

const PageSwitch = () => {
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'new') dispatch(initNew());
    else if (type === 'recent') dispatch(initRecent());
  }

  return (
    <div>
      <div>
        <button onClick={() => handlePageSwitch('new')}>new</button>
        <button onClick={() => handlePageSwitch('recent')}>recent</button>
      </div>
    </div>
  )
}

export default PageSwitch