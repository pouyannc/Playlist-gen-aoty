require('dotenv').config();

const { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI } = process.env;

module.exports = { 
  PORT, 
  CLIENT_ID, 
  CLIENT_SECRET,
  REDIRECT_URI 
};