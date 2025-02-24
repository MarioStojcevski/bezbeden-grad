import { Browser, BrowserContext, chromium, expect, Page, test } from '@playwright/test';
import PageObjectHandler from '../../PageObjectHandler';

test.describe('Dnevni Bilteni Scrape', () => {
  let handler: PageObjectHandler;
  let context: BrowserContext;
  let browser: Browser;
  let page: Page;

  test.beforeAll(async () => {
    browser = await chromium.launch();
  });

  test.beforeEach(async () => {
    context = await browser.newContext();
    page = await context.newPage();
    handler = new PageObjectHandler(page);
  });

  test.afterEach(async () => {
    await page.close();
    await context.close();
  });

  test.afterAll(async () => {
    await browser.close();
  });

  test("Collect all events", async () => {
    await handler.dnevniBilteniPage.open();
    await page.waitForLoadState('domcontentloaded');
    
    await handler.dnevniBilteniPage.crawlAndCollect();
  }
  );
});