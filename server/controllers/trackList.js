const trackListRouter = require('express').Router();
const { default: axios } = require('axios');
const scrape = require('../scraper/index');

trackListRouter.get('/', async (req, res) => {
  const { length, s } = req.query;
  const scrapeUrl = `https://www.albumoftheyear.org/2023/releases/?type=lp&s=${s}`;
  const accessToken = req.query.access_token;

  const trackList = await scrape();

  // Convert the tracklist from names to spotify URIs
  const config = {
    headers: { Authorization: `Bearer ${accessToken}` }
  }
  const trackURIs = [];
  for (trackName of trackList) {
    const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${trackName}&type=track&limit=1`, config);
    trackURIs.push(searchRes.data.tracks.items[0].uri);
  }

  // Create a new spotify playlist
  await res.json(trackURIs);
})

module.exports = trackListRouter;
