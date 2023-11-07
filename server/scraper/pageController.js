const pageScraper = require('./pageScraper');

const scrapeAll = async (browserInstance) => {
	let browser;
	try{
		browser = await browserInstance;
		const tracklist = await pageScraper.scraper(browser);	
    return tracklist
	}
	catch(err){
		console.log("Could not resolve the browser instance => ", err);
	}
}

module.exports = (browserInstance) => scrapeAll(browserInstance)