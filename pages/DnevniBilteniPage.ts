import { Page } from "@playwright/test";
import { DNEVNI_BILTENI_URL } from "../utils/constants";

class DnevniBilteniPage {
  private page: Page;
  private listaGodini
  private listaMeseci
  private mediaDiv
  private contentSpan

  constructor(page: Page) {
    this.page = page;
    this.listaGodini = this.page.locator('//li[@class="title"]');
    this.listaMeseci = this.page.locator('//li[@class="fields"]/a');
    this.mediaDiv = this.page.locator('//section//div[@class="media-body"]/a[@id="catg_title" and contains(text, "")]');;
    this.contentSpan = this.page.locator('//span[@id="MainContent_litNaslov"]')
  }

  async open() {
    await this.page.goto(DNEVNI_BILTENI_URL);
  }


  async getMediaText(){
    return await this.contentSpan.innerText();
  }

  //TODO: Implement method that goes through all the years and months, clicks through all mediaDivs and returns the text of the mediaDiv
};

export default DnevniBilteniPage;