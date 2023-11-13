import { useEffect} from 'react'
import { useDispatch } from 'react-redux'
import './App.css'
import { getUID } from './reducers/userReducer';
import { setTokens } from './services/user';
import { useSearchParams } from 'react-router-dom';
import PageContent from './components/pageContent';
import PageSwitch from './components/PageSwitch';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const serverUrl = 'http://localhost:3003/api'

  useEffect(() => {
    let accessToken = localStorage.getItem('access');
    let refreshToken = localStorage.getItem('refresh');

    if (accessToken && refreshToken) {
      setTokens(accessToken, refreshToken);
    } else {
      const urlParams = new URLSearchParams(window.location.search);
      accessToken = urlParams.get('access_token');
      refreshToken = urlParams.get('refresh_token');
      
      if (accessToken && refreshToken) {
        console.log('setting tokens');
        setTokens(accessToken, refreshToken);

        searchParams.delete('access_token');
        searchParams.delete('refresh_token');
        setSearchParams(searchParams);
      }
    }
    
    console.log('setting uid')
    accessToken && dispatch(getUID());
  }, [])

  return (
    <>
      <a href={`${serverUrl}/login`}>Login with Spotify</a>
      <PageSwitch />
      <PageContent />
      {
      //<div>{albums.map((a) => <div key={Math.random()*9999}>{a}</div>)}</div>
      }
    </>
  )
}

export default App
