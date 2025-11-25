import { Page, Locator } from '@playwright/test';
import { Timeout } from '../utils/enums';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async waitForPageToLoad(timeout = Timeout.MEDIUM): Promise<void> {
    await this.page.waitForLoadState('load', { timeout });
  }

  getElement(selector: string): Locator {
    return this.page.locator(selector);
  }

  async click(selector: string): Promise<void> {
    await this.waitForVisible(selector);
    await this.page.locator(selector).click();
  }

  async fill(selector: string, value: string): Promise<void> {
    await this.waitForVisible(selector);
    await this.page.locator(selector).fill(value);
  }

  async waitForVisible(selector: string, timeout = Timeout.LONG): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible', timeout });
  }

  async getText(selector: string): Promise<string> {
    await this.waitForVisible(selector);
    return (await this.page.locator(selector).innerText()).trim();
  }

  async isVisible(selector: string): Promise<boolean> {
    return await this.page.locator(selector).isVisible();
  }
  async waitForReadiness(number = Timeout.MINI_WAIT): Promise<void> {
    return await this.page.waitForTimeout(number);
  }
}
