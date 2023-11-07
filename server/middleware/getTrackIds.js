const { default: axios } = require("axios")

const getTrackIds = (req, res, next) => {
  axios.get("https://api.spotify.com/v1/search")
}