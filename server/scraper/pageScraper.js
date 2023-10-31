const scraperObject = {
	url: 'https://www.albumoftheyear.org/releases/this-week/',
	async scraper(browser){
		let page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36");
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url, { waitUntil: 'domcontentloaded' });
    // Wait for the required DOM to be rendered
    console.log('Waiting for selector to load...');
    await page.waitForSelector('.wideLeft');
    console.log('Constructing result array...')
		let titles = await page.$$eval('.albumBlock', (albums) => albums.map((a) => a.querySelector('.albumTitle').innerText));
		console.log(titles);

    browser.close();
	}
}

module.exports = scraperObject;