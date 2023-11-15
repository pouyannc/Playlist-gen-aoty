import axios from 'axios';

const profileURL = 'https://api.spotify.com/v1/me'
const serverURL = 'http://localhost:3003/api/login'

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
  console.log(res.data)
  setTokens(res.data.access_token, res.data.refresh_token);
}

const getSpotifyUID = async () => {
  try {
    const res = await axios.get(profileURL, { headers: { 'Authorization': tokens.accessToken } });
    return res.data.id;
  } catch (error) {
    console.log(error);
    refreshToken();
    const res = await axios.get(profileURL, { headers: { 'Authorization': tokens.accessToken } });
    return res.data.id;
  }
}

export {
  setTokens,
  getSpotifyUID,
};