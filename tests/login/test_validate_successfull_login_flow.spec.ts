import { PageLoadState, Timeout } from '../../src/utils/enums';
import { expect, test } from '@playwright/test';
import { LoginPage } from '../../src/pageObjects/login/login.page';
import { OrganisationData } from '../../src/testData/organisationData/organisationData';
import {DashboardData} from "../../src/testData/dashboard/dashboardData";
import {stagingData} from "../../src/testData/userData/usersData";

const QUICK_ACTION_LABELS = ['Surveys', 'Record Media', 'Course Builder', 'StudioMail'];

test('MarketScale Studio Login Flow', async ({ page }) => {
  const loginUrl = process.env.MARKETSCALE_STAGING_URL!;

  const loginPage = new LoginPage(page);
  await loginPage.waitForPageToLoad();
  await page.goto(loginUrl);
  await expect(page.getByRole('heading', { name: OrganisationData.loginHeading })).toBeVisible();

  await loginPage.addUsernameOrEmail(stagingData.user1.email);
  await loginPage.clickContinue();

  await loginPage.addPassword(stagingData.user1.password);
  await expect(page.getByRole('link', { name: OrganisationData.forgotPasswordLink })).toBeVisible();
  await loginPage.clickSignIn();
  await page.waitForSelector("button");
  await page.waitForLoadState(PageLoadState.DOM_CONTENT_LOADED);
  await loginPage.selectOrganisation(OrganisationData.shahQaOrganisation);
  await page.waitForLoadState(PageLoadState.NETWORK_IDLE, {timeout:Timeout.ONE_MINUTE});
  await page.waitForSelector(DashboardData.searchField);
  await expect(page.getByPlaceholder('Search')).toBeVisible();
  await page.waitForURL(/dashboard/i, { timeout: Timeout.LONG });
  for (const action of QUICK_ACTION_LABELS) {
    await expect(page.getByText(action, { exact: false })).toBeVisible();
  }
});
