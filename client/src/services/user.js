import axios from 'axios';
import saveSessionExpiry from '../util/saveSessionExpiry';
import refreshSessionIfNeeded from '../util/checkAndRefreshSession.ja';

const profileURL = 'https://api.spotify.com/v1/me'
const serverURL = '/api/login'

let tokens;

const setTokens = (access, refresh) => {
  tokens = {
    accessToken: `Bearer ${access}`,
    refreshToken: refresh,
  }
  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);
};

const refreshToken = async () => {
  const res = await axios.get(`${serverURL}/refresh?refresh_token=${tokens.refreshToken}`)
  setTokens(res.data.access_token, tokens.refreshToken);
  saveSessionExpiry(res.data.expires_in);
}

const getSpotifyUID = async () => {
  await refreshSessionIfNeeded();
  try {
    const res = await axios.get(profileURL, { headers: { 'Authorization': tokens.accessToken } });
    return res.data.id;
  } catch (error) {
    console.log('Could not retrieve user id', error);
  }
}

export {
  setTokens,
  getSpotifyUID,
  refreshToken,
};
