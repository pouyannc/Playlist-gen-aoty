class PuppeteerManager {
  constructor(args) {
      this.url = args.url
      this.nrOfTracks = args.nrOfTracks
      this.tracksPerAlbum = args.tracksPerAlbum
      this.newReleases = true;
  }

  async runPuppeteer() {
    const puppeteer = require('puppeteer-extra');
    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-gpu",
      ],
      dumpio: false,
    });
    let page = await browser.newPage();
    console.log(this.url, this.nrOfTracks, this.tracksPerAlbum)
    console.log('going to url', this.url)
    await page.goto(this.url, { waitUntil: 'domcontentloaded' });

    const albumUrls = await this.getAllAlbumUrlsOnPage(page, this.newReleases);
    const tracks = await this.getTracks(page, albumUrls, this.nrOfTracks, this.tracksPerAlbum);


    console.log('done')
    await browser.close()
    return tracks;
  }

  async getAllAlbumUrlsOnPage(page, sortNewReleases = false) {
    console.log('Waiting for selector to load...');
    await page.waitForSelector('#centerContent');
    console.log('Constructing links array...')
    const lpLinks = await page.$$eval('.albumBlock > a + a', (albums) => albums.map((a) => a.href));

    // Include number of ratings in the links array, sort by ratings, and returns sorted links
    if (sortNewReleases) {
      const numberOfRatings = await page.$$eval('.ratingRow:nth-of-type(2) .ratingText:nth-of-type(2)', (ratings) => (
        ratings.map((r) => r.innerText.replace(/\(|\)/g, ''))
      ))
      const lpLinksWithRatings = lpLinks.map((l, i) => ({ url: l, ratings: numberOfRatings[i] }));
      const lpLinksSorted = lpLinksWithRatings.sort((a, b) => parseInt(b.ratings) - parseInt(a.ratings));
      return lpLinksSorted.map((lpObject) => lpObject.url);
    }

    return lpLinks;
  }

  async getTracks(page, albumUrls, nrOfTracks, tracksPerAlbum) {
    const shuffle = require('../utils/shuffle');
    let tracks = [];
    for (let i = 0; i < albumUrls.length; i++) {
      console.log("Navigating to LP page... ", albumUrls[i]);
      await page.goto(albumUrls[i], { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#centerContent');
      const artist = await page.$eval('.artist a', (a) => a.innerText);
      const onSpotify = await page.$('.albumButton.spotify')
      if (onSpotify) {
        const trackTitles = await page.$$eval('.trackTitle > a', (trackNames) => trackNames.map(t => t.innerText));
        const randomTitles = shuffle(trackTitles);
        for (let j = 0; j < tracksPerAlbum; j++) {
          tracks.push({ title: randomTitles[j], artist });
          if (tracks.length == nrOfTracks) return tracks;
        }
      }
      console.log(tracks)
    }
  }
}

module.exports = PuppeteerManager;
