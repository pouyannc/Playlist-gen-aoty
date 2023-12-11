const { default: axios } = require('axios');

const playlistRouter = require('express').Router();

playlistRouter.post('/create', async (req, res) => {
  try {
    const uid = req.body.uid;
    const name = req.body.playlistName;
    const accessToken = req.query.access_token;

    const playlistReq = {
      name,
    }
    const playlistRes = await axios.post(`https://api.spotify.com/v1/users/${uid}/playlists`, playlistReq, { headers: {'Authorization': `Bearer ${accessToken}` } });
    const pid = playlistRes.data;
    res.json(pid);
  } catch (err) {
    console.log(err, 'Error creating new Spotify playlist');
  }
  
})

playlistRouter.post('/populate', async (req, res) => {
  try{
    const pid = req.body.pid;
    const uris = req.body.uris;
    const accessToken = req.query.access_token;

    const populateReq = {
      uris,
    }
    const playlistRes = await axios.post(`https://api.spotify.com/v1/playlists/${pid}/tracks`, populateReq, { headers: {'Authorization': `Bearer ${accessToken}` } });
    
    res.status(201).json(playlistRes.data.snapshot_id);
  } catch (err) {
    console.log( 'Error populating Spotify playlist');
  }
})

module.exports = playlistRouter;
