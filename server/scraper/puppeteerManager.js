class PuppeteerManager {
  constructor(args) {
      this.url = args.url
      this.existingCommands = args.commands
      this.nrOfTracks = args.nrOfTracks
      this.albums = [];
      this.tracks = {}
  }

  async runPuppeteer() {
    const puppeteer = require('puppeteer');
    const commands = this.existingCommands;

    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-gpu",
      ],
      dumpio: false,
    });
    let page = await browser.newPage();
    await page.goto(this.url);

    let timeout = 6000
    let commandIndex = 0
    while (commandIndex < commands.length) {
        try {
            console.log(`command ${(commandIndex + 1)}/${commands.length}`)
            let frames = page.frames()
            await frames[0].waitForSelector(commands[commandIndex].locatorCss, { timeout: timeout })
            await this.executeCommand(frames[0], commands[commandIndex])
            await this.sleep(1000)
        } catch (error) {
            console.log(error)
            break
        }
        commandIndex++
    }
    console.log('done')
    await browser.close()

    
  }
}
module.exports = { PuppeteerManager }