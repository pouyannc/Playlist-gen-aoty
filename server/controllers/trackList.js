const trackListRouter = require('express').Router();
const { default: axios } = require('axios');
const PuppeteerManager = require('../scraper/puppeteerManager');

trackListRouter.get('/', async (req, res) => {
  const { scrape_url, nr_tracks, tracks_per, access_token, return_type, type} = req.query;
  let trackList;

  try{
    const arg = { url: scrape_url, nrOfTracks: nr_tracks, tracksPerAlbum: tracks_per, type: type.split('/')[0] }
    const scraper = new PuppeteerManager(arg);

    trackList = await scraper.runPuppeteer();
  } catch (err) {
    console.log(err, 'Error scraping tracklist')
  }
  

  // Convert the tracklist from names to spotify URIs
  try {
    console.log('Converting tracklist to spotify URIs...')
    const config = {
      headers: { Authorization: `Bearer ${access_token}` }
    }
    const trackData = [];
    console.log(trackList)
    for (track of trackList) {
      const trackName = encodeURIComponent(track.title);
      const artistName = encodeURIComponent(track.artist);
      const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${trackName}%20${artistName}&type=track&limit=1`, config);
      if (return_type === 'uri') trackData.push(searchRes.data.tracks.items[0].uri);
      else if (return_type === 'cover') trackData.push({
        src: searchRes.data.tracks.items[0].album.images[1].url,
        artist: track.artist,
      });
    }

    res.status(200).json(trackData);
  } catch (err) {
    console.log(err, 'Error converting tracklist to Spotify URIs');
  }
  
})

module.exports = trackListRouter;
