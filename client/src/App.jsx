import { useState } from 'react'
import './App.css'

function App() {
  const [albums, setAlbums] = useState("");

  const getAlbumsList = () => {
    setAlbums("best albums!")
  }

  return (
    <>
      <button type='button' onClick={getAlbumsList}>Generate List</button>
      <div>{albums}</div>
    </>
  )
}

export default App
