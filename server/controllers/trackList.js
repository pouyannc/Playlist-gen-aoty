const trackListRouter = require('express').Router();
const { default: axios } = require('axios');
const PuppeteerManager = require('../scraper/puppeteerManager');

trackListRouter.get('/', async (req, res) => {
  const { scrape_url, nr_tracks, tracks_per, access_token, sort } = req.query;

  const arg = { url: scrape_url, nrOfTracks: nr_tracks, tracksPerAlbum: tracks_per, sortReleases: sort }
  const scraper = new PuppeteerManager(arg);

  const trackList = await scraper.runPuppeteer();

  // Convert the tracklist from names to spotify URIs
  console.log('Converting tracklist to spotify URIs...')
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  }
  const trackURIs = [];
  console.log(trackList)
  for (track of trackList) {
    const trackName = encodeURIComponent(track.title);
    const artistName = encodeURIComponent(track.artist);
    const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${trackName}%20${artistName}&type=track&limit=1`, config);
    trackURIs.push(searchRes.data.tracks.items[0].uri);
  }

  await res.json(trackURIs);
})

module.exports = trackListRouter;
