const { default: axios } = require("axios")

const spotifyPlaylist = async (req, res, next) => {
  const newSpotifyPlaylist = axios.post("https://api.spotify.com/v1/users/{user_id}/playlists")
  const playlistId = newSpotifyPlaylist.data.id;

  const addTracks = axios.post("https://api.spotify.com/v1/playlists/{playlist_id}/tracks")
}