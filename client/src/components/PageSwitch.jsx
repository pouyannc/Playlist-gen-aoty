import { useDispatch } from 'react-redux'
import { initNew, initRecent } from '../reducers/playlistReducer';
import { Button } from '@mui/material';

const PageSwitch = () => {
  const dispatch = useDispatch();

  const handlePageSwitch = (type) => {
    if (type === 'new') dispatch(initNew());
    else if (type === 'recent') dispatch(initRecent());
  }

  return (
    <div>
      <div>
        <Button onClick={() => handlePageSwitch('new')}>new</Button>
        <Button onClick={() => handlePageSwitch('recent')}>recent</Button>
      </div>
    </div>
  )
}

export default PageSwitch