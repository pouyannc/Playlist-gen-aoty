import React from 'react'
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
      <button onClick={() => handlePageSwitch('new')}>new</button>
      <button onClick={() => handlePageSwitch('recent')}>recent</button>
      <button>decades</button>
    </div>
  )
}

export default PageSwitch