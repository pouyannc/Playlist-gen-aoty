class PuppeteerManager {
  constructor(args) {
      this.url = args.url
      this.nrOfTracks = args.nrOfTracks
      this.tracksPerAlbum = args.tracksPerAlbum
      this.type = args.type;
  }

  async runPuppeteer() {
    const puppeteer = require('puppeteer-extra');

    require('puppeteer-extra-plugin-stealth/evasions/chrome.app');
    require('puppeteer-extra-plugin-stealth/evasions/chrome.csi');
    require('puppeteer-extra-plugin-stealth/evasions/chrome.loadTimes');
    require('puppeteer-extra-plugin-stealth/evasions/chrome.runtime');
    require('puppeteer-extra-plugin-stealth/evasions/iframe.contentWindow');
    require('puppeteer-extra-plugin-stealth/evasions/media.codecs');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.hardwareConcurrency');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.languages');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.permissions');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.plugins');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.vendor');
    require('puppeteer-extra-plugin-stealth/evasions/navigator.webdriver');
    require('puppeteer-extra-plugin-stealth/evasions/sourceurl');
    require('puppeteer-extra-plugin-stealth/evasions/user-agent-override');
    require('puppeteer-extra-plugin-stealth/evasions/webgl.vendor');
    require('puppeteer-extra-plugin-stealth/evasions/window.outerdimensions');
    require('puppeteer-extra-plugin-stealth/evasions/defaultArgs');
    require('puppeteer-extra-plugin-user-preferences');
    require('puppeteer-extra-plugin-user-data-dir');

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
    console.log('going to url', this.url)
    await page.goto(this.url, { waitUntil: 'domcontentloaded' });

    const albumUrls = await this.getAllAlbumUrlsOnPage(page, this.type);

    const res = await this.getTracks(page, albumUrls, this.nrOfTracks, this.tracksPerAlbum);

    console.log('done')
    await browser.close()
    return res;
  }

  async getAllAlbumUrlsOnPage(page, type) {
    console.log('Waiting for selector to load...');
    await page.waitForSelector('#centerContent');

    console.log('Constructing links array...')
    let lpLinks = [];
    if (type === 'months' || type === 'years') {
      let nrPages;
      if (type === 'months') nrPages = 4;
      else if (type === 'years') nrPages = 3;
      let maxPageLength = 0;
      const monthLinks = [];
      for (let i = 0; i < nrPages; i++) {
        console.log('on page', i + 1);
        await page.waitForSelector('.prev');
        const currentMonth = await page.$$eval('.image > a', (albums) => albums.map((a) => a.href));
        if (currentMonth.length > maxPageLength) maxPageLength = currentMonth.length;
        monthLinks.push(currentMonth);
        const nextPage = await page.$eval('.headline + div > a', (pageLink) => pageLink.href);
        await page.goto(nextPage, { waitUntil: 'domcontentloaded' });
      }
      for (let i = 0; i < maxPageLength; i++) {
        for (let j = 0; j < monthLinks.length; j++) {
          if (monthLinks[j][i]) lpLinks.push(monthLinks[j][i]);
        }
      }
    } else {
      lpLinks = await page.$$eval('.image > a', (albums) => albums.map((a) => a.href));
    }

    // Include number of ratings in the links array, sort by ratings, and returns sorted links
    if (type === 'new') {
      console.log('Sorting releases by number of ratings...');
      const ratingRowContainers = await page.$$('.ratingRowContainer');
      const nrUserRatings = []
      for (let i = 0; i < ratingRowContainers.length; i++) {
        const ratings = await ratingRowContainers[i].$$eval('.ratingText', (ratingTexts) => {
          for (let i = 0; i < ratingTexts.length; i++) {
            if (ratingTexts[i].innerText === 'user score') return ratingTexts[i+1].innerText;
          }
          return '0';
        });
        nrUserRatings.push(ratings.replace(/\(|\)|\,/g, ''));
      }

      const lpLinksWithRatings = lpLinks.map((l, i) => ({ url: l, ratings: nrUserRatings[i] }));
      const lpLinksSorted = lpLinksWithRatings.sort((a, b) => parseInt(b.ratings) - parseInt(a.ratings));
      //console.log('sorted lps:', lpLinksSorted)
      lpLinks = lpLinksSorted.map((lpObject) => lpObject.url);
    }

    return lpLinks;
  }

  async getTracks(page, albumUrls, nrOfTracks, tracksPerAlbum) {
    const shuffle = require('../utils/shuffle');
    let tracks = [];
    let albumUrlsLength = albumUrls.length
    if (nrOfTracks === '6') albumUrlsLength = albumUrls.length/2;
    for (let i = 0; i < albumUrlsLength; i++) {
      console.log("Navigating to LP page... ", albumUrls[i]);
      await page.goto(albumUrls[i], { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#centerContent');
      const artist = await page.$eval('.artist a', (a) => a.innerText);
      const onSpotify = await page.$('.albumButton.spotify')
      if (onSpotify) {
        let trackTitles = await page.$$eval('.trackTitle > a', (trackNames) => trackNames.map(t => t.innerText));
        if (!trackTitles[0]) {
          trackTitles = await page.$$eval('.trackList li', (trackNames) => trackNames.map(t => t.innerText));
        }
        const randomTitles = shuffle(trackTitles);
        for (let j = 0; j < tracksPerAlbum; j++) {
          tracks.push({ title: randomTitles[j], artist });
          console.log('Pushed to tracklist:', tracks[i], tracks.length)
          if (tracks.length == nrOfTracks) return tracks;
        }
      }
    }
    return tracks;
  }
}

module.exports = PuppeteerManager;
