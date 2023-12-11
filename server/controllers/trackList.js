const trackListRouter = require('express').Router();
const { default: axios } = require('axios');
const PuppeteerManager = require('../scraper/puppeteerManager');
const shuffle = require('../utils/shuffle');

trackListRouter.get('/', async (req, res) => {
  const { scrape_url, nr_tracks, tracks_per, access_token, return_type, type} = req.query;

  let albums;
  try{
    const arg = { url: scrape_url, nrOfTracks: nr_tracks, tracksPerAlbum: tracks_per, type: type.split('/')[0] }
    const scraper = new PuppeteerManager(arg);

    // retrieve array of album objects (artist name and album title)
    albums = await scraper.runPuppeteer();
  } catch (err) {
    console.log(err, 'Error scraping albums')
  }

  // Obtain album Ids from spotify/search
  let albumIds = [];
  try {
    console.log('Obtaining Spotify album ids...');
    const config = {
      headers: { Authorization: `Bearer ${access_token}` }
    }
    console.log(albums)
    for (album of albums) {
      const albumTitle = encodeURIComponent(album.album);
      const artistName = encodeURIComponent(album.artist);
      const searchRes = await axios.get(`https://api.spotify.com/v1/search?q=${albumTitle}%20${artistName}&type=album&limit=1`, config);
      // Need to set limits for number of albums here based on nrOfTracks / tracksPerAlbum
      if (
        album.album.localeCompare(searchRes.data.albums.items[0].name, undefined, { sensitivity: 'base' }) === 0
        && album.artist.toLowerCase().includes(searchRes.data.albums.items[0].artists[0].name.toLowerCase())
      ) {
        if (return_type === 'uri') albumIds.push(searchRes.data.albums.items[0].id);
        else if (return_type === 'cover') {
          albumIds.push({
            src: searchRes.data.albums.items[0].images[1].url,
            artist: album.artist, 
          });
        }
      }
      if (albumIds.length >= Math.ceil(nr_tracks/tracks_per)) break;
    }
  } catch (err) {
    console.log (err);
  }

  // Obtain album tracks from spotify/albums OR just return the album covers
  let trackList = [];
  try {
    if (return_type === 'cover') {
      trackList = albumIds;
    } else {
      console.log('Obtaining album tracks...');
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
      console.log(albumIds);
      const nrReqSets = Math.ceil(albumIds.length / 20);
      for (let i = 0; i < nrReqSets; i += 20) {
        const reqIds = albumIds.slice(i, i + 20);
        const albumsRes = await axios.get(`https://api.spotify.com/v1/albums?ids=${reqIds.join(',')}`, config);
        console.log(albumsRes.data.albums.length);
        for (aRes of albumsRes.data.albums) {
          const tracksUris = aRes.tracks.items.map((track) => track.uri);
          const shuffledTrackUris = shuffle(tracksUris);
          trackList = trackList.concat(shuffledTrackUris.slice(0, tracks_per));
        }
      }
    }

    console.log(trackList.slice(0, nr_tracks))
    res.status(200).json(trackList.slice(0, nr_tracks));
  } catch (err) {
    console.log (err);
  }
})

module.exports = trackListRouter;
