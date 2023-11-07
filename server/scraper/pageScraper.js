const shuffle = require("../utils/shuffle");

const scraperObject = {
	url: 'https://www.albumoftheyear.org/2023/releases/?type=lp&s=user&reviews=500',
  sleep(ms) {
    console.log('sleeping for:', ms)
    return new Promise(resolve => setTimeout(resolve, ms))
  },
	async scraper(browser){
		let page = await browser.newPage();
		console.log(`Navigating to ${this.url}...`);
		await page.goto(this.url, { waitUntil: 'domcontentloaded' });
    // Wait for the required DOM to be rendered
    console.log('Waiting for selector to load...');
    await page.waitForSelector('.facetContent');
    console.log('Constructing links array...')
    const lpLinks = await page.$$eval('.albumBlock > a + a', (albums) => albums.map((a) => a.href));
    let tracks = [];
    for (let i = 0; i < lpLinks.length; i++) {
      console.log("Navigating to LP page... ", lpLinks[i]);
      await page.goto(lpLinks[i], { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#centerContent');
      const onSpotify = await page.$('.albumButton.spotify')
      if (onSpotify) {
        const trackTitles = await page.$$eval('.trackTitle > a', (trackNames) => trackNames.map(t => t.innerText));
        const randomTitles = shuffle(trackTitles);
        tracks.push(randomTitles[0]);
        if (tracks.length == 20) {
          browser.close()
          return tracks;
        }
      }
      console.log(tracks)
    }
    browser.close()
    return tracks;
	}
}

module.exports = scraperObject;