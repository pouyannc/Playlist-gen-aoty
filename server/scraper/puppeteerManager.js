class PuppeteerManager {
  constructor(args) {
      this.url = args.url
      this.nrOfTracks = args.nrOfTracks
      this.tracksPerAlbum = args.tracksPerAlbum
      this.type = args.type;
  }

  async runPuppeteer() {
    const puppeteer = require('puppeteer-extra');

    const StealthPlugin = require('puppeteer-extra-plugin-stealth')
    puppeteer.use(StealthPlugin())

    const browser = await puppeteer.launch({
      args: ['--hide-scrollbars', "--no-sandbox", '--disable-gpu'],
      headless: true,
      dumpio: false,
    });

    try {
      let page = await browser.newPage();
      console.log('going to url', this.url)
      await page.goto(this.url, { waitUntil: 'domcontentloaded' });

      const res = await this.getAllAlbumsOnPage(page, this.type, browser);

      console.log('done')
      await browser.close()
      return res;
    } catch (err) {
      console.log(err);
    } finally {
      await browser.close();
    }
  }

  async getAllAlbumsOnPage(page, type, browser) {
    console.log('Waiting for selector to load...');
    await page.waitForSelector('#centerContent');

    console.log('Constructing album data array...')
    let lps = [];
    if (type === 'months' || type === 'years') {
      let nrPages;
      if (type === 'months') nrPages = 4;
      else if (type === 'years') nrPages = 3;
      let maxPageLength = 0;
      const monthLps = [];
      for (let i = 0; i < nrPages; i++) {
        console.log('on page', i + 1);
        await page.waitForSelector('.prev');
        const currentMonth = await page.evaluate(() => {
          const albumBlocks = Array.from(document.querySelectorAll('.albumBlock'));
          return albumBlocks.map((block) => ({
            artist: block.querySelector('.artistTitle').textContent,
            album: block.querySelector('.albumTitle').textContent,
          }))
        })
        if (currentMonth.length > maxPageLength) maxPageLength = currentMonth.length;
        monthLps.push(currentMonth);
        const nextPage = await page.$eval('.headline + div > a', (pageLink) => pageLink.href);

        await page.close();
        page = await browser.newPage();
        await page.goto(nextPage, { waitUntil: 'domcontentloaded' });
      }
      for (let i = 0; i < maxPageLength; i++) {
        for (let j = 0; j < monthLps.length; j++) {
          if (monthLps[j][i]) lps.push(monthLps[j][i]);
        }
      }
    } else {
      lps = await page.evaluate(() => {
        const albumBlocks = Array.from(document.querySelectorAll('.albumBlock'));
        return albumBlocks.map((block) => ({
          artist: block.querySelector('.artistTitle').textContent,
          album: block.querySelector('.albumTitle').textContent,
        }))
      })
      if (type !== 'new') {
        await page.close();
        page = await browser.newPage();
        await page.goto(`${this.url}&page=2`, { waitUntil: 'domcontentloaded' });
        const lps2 = await page.evaluate(() => {
          const albumBlocks = Array.from(document.querySelectorAll('.albumBlock'));
          return albumBlocks.map((block) => ({
            artist: block.querySelector('.artistTitle').textContent,
            album: block.querySelector('.albumTitle').textContent,
          }))
        })
        lps = lps.concat(lps2)
      }
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

      const lpLinksWithRatings = lps.map((l, i) => ({ ...l, ratings: nrUserRatings[i] }));
      lps = lpLinksWithRatings.sort((a, b) => parseInt(b.ratings) - parseInt(a.ratings));
    }
    return lps;
  }
}

module.exports = PuppeteerManager;
