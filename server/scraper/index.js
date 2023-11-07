const browserObject = require('./browser');
const scraperController = require('./pageController');

const main = () => {
  //Start the browser and create a browser instance
  let browserInstance = browserObject.startBrowser();

  // Pass the browser instance to the scraper controller
  return scraperController(browserInstance);
}

//main();


module.exports = main;
