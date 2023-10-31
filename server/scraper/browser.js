const puppeteer = require('puppeteer');

const startBrowser = async () => {
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({
	        headless: true,
          args: [
            "--no-sandbox",
            '--disable-setuid-sandbox',
            "--disable-gpu",
          ],
	    });
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	}
	return browser;
}

module.exports = {
	startBrowser
};