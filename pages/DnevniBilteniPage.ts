import { Locator, Page } from "@playwright/test";
import { DNEVNI_BILTENI_URL } from "../utils/constants";
import { existsSync, mkdirSync, writeFileSync } from "fs";

class DnevniBilteniPage {
  private page: Page;
  private yearsList: Locator;
  private monthsList: Locator;
  private postLinkList: Locator;
  private postLabelList: Locator;
  private contentSpan: Locator;

  constructor(page: Page) {
    this.page = page;
    this.yearsList = this.page.locator('//li[@class="title"]');
    this.monthsList = this.page.locator('//li[@class="fields"]/a');
    this.postLinkList = this.page.locator('//section//div[@class="media-body"]/a[@id="catg_title" and contains(text, "")]');
    this.postLabelList = this.page.locator('//section//div[@class="media-body"]/a[@id="post_date" and contains(text, "")]');
    this.contentSpan = this.page.locator('//span[@id="MainContent_litNaslov"]')
  }

  async open() {
    await this.page.goto(DNEVNI_BILTENI_URL);
  }

  async getMediaText() {
    return await this.contentSpan.innerText();
  }

  async crawlAndCollect() {
    const numberOfYearLocators = await this.yearsList.count();
    for (let i = 0; i < numberOfYearLocators; i++) {
      await this.yearsList.nth(i).click();
      const yearText = await this.yearsList.nth(i).innerText();
      const numberOfMonthsForCurrentYear = await this.monthsList.count();
      const yearFolderPath = `./media/${yearText}`;
      const isYearFolderCreated = existsSync(yearFolderPath);
      if(!isYearFolderCreated) {
        mkdirSync(yearFolderPath,
          { recursive: true }
        );
      }
      for (let j = 0; j < numberOfMonthsForCurrentYear; j++) {
        await this.monthsList.nth(j).click();
        const monthText = (`${j+1}_`).concat(await this.monthsList.nth(j).innerText());
        const monthFolderPath = `./media/${yearText}/${monthText}`;
        const isMonthFolderCreated = existsSync(monthFolderPath);
        if(!isMonthFolderCreated) {
          mkdirSync(monthFolderPath,
            { recursive: true }
          );
        }
        const numberOfMediaDivs = await this.postLinkList.count();
        for (let k = 0; k < numberOfMediaDivs; k++) {
          const postLabelText = (await this.postLabelList.nth(k).innerText()).split(' ').slice(2).join('_');
          await this.postLinkList.nth(k).click();
          const mediaText = await this.getMediaText();
          writeFileSync(`./media/${yearText}/${monthText}/${postLabelText}.txt`, mediaText);
          await this.monthsList.nth(j).click();
        }
      }
    }
  }
};

export default DnevniBilteniPage;