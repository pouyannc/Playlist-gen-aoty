const { default: axios } = require('axios');
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, REFRESH_TOKEN } = require('../utils/config');


const loginRouter = require('express').Router();

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

loginRouter.get('/', async (req, res) => {
  const state = generateRandomString(16);

  try {
    res.redirect(`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`)
  } catch (err) {
    console.log(err, 'error at login redirect');
  }
})

loginRouter.get('/callback', async (req, res) => {
  console.log('reached authorize callback')

  const code = req.query.code || null;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: REDIRECT_URI,
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    },
    headers: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
  };

  try{
    const tokenRes = await axios.post(authOptions.url, authOptions.form, authOptions.headers)
    const paramsObj = {
      access_token: tokenRes.data.access_token,
      refresh_token: tokenRes.data.refresh_token,
      expires_in: tokenRes.data.expires_in,
    };
    const searchParams = new URLSearchParams(paramsObj);

    console.log('assigned new access and refresh tokens')
    res.redirect('/?' + searchParams.toString());

  } catch (error) {
    console.log(error, 'error retrieving auth tokens')
  }
})

loginRouter.get('/refresh', async (req, res) => {
  const refresh_token = req.query.refresh_token || REFRESH_TOKEN;

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      refresh_token: refresh_token,
      grant_type: 'refresh_token',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET
    },
    headers: {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    },
  };

  try{
    const tokenRes = await axios.post(authOptions.url, authOptions.form, authOptions.headers)
    console.log('refreshed token')
    const paramsObj = {
      access_token: tokenRes.data.access_token,
      expires_in: tokenRes.data.expires_in,
    };
    res.status(201).json(paramsObj);
  } catch (error) {
    console.log(error, 'error refreshing auth tokens' )
  }
})

module.exports = loginRouter;