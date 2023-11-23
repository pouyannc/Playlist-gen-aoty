import { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUID } from './reducers/userReducer';
import { setTokens } from './services/user';
import { useSearchParams } from 'react-router-dom';
import PageContent from './components/pageContent';
import PageSwitch from './components/PageSwitch';
import SubPageSwitch from './components/SubPageSwitch';
import saveSessionExpiry from './util/saveSessionExpiry';
import { Container } from '@mui/material';
import Nav from './components/Nav';

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const uid = useSelector(({ user }) => user.spotifyUID);
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

        const expiresIn = urlParams.get('expires_in');
        saveSessionExpiry(expiresIn);

        searchParams.delete('access_token');
        searchParams.delete('refresh_token');
        searchParams.delete('expires_in');
        setSearchParams(searchParams);
      }
    }
    
    accessToken && dispatch(getUID());
  }, [])

  return (
    uid === '' ?
      <>
        <a href={`${serverUrl}/login`}>Login with Spotify</a>
      </>
    :
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <Nav />
        <PageSwitch />
        <SubPageSwitch />
        <PageContent />
      </Container>
  )
}

export default App
