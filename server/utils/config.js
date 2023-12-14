require('dotenv').config();

const { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN } = process.env;

module.exports = { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI ,
  REFRESH_TOKEN
};