require('dotenv').config();

const { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI,
  BLESS_KEY } = process.env;

module.exports = { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI ,
  BLESS_KEY
};