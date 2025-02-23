import { Page } from "@playwright/test";
import DnevniBilteniPage from "./pages/DnevniBilteniPage";

class PageObjectHandler {
  public readonly dnevniBilteniPage: DnevniBilteniPage;
  
  constructor(public readonly page: Page) {
    this.dnevniBilteniPage = new DnevniBilteniPage(page);
  }
}

export default PageObjectHandler;