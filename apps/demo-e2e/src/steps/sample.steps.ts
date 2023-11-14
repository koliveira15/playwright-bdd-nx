import { createBdd } from 'playwright-bdd';
import {expect} from '@ngx-playwright/test';

const { Given, When, Then } = createBdd();

Given('I open url {string}', async ({ page }, url) => {
  await page.goto(url);
});

When('I click link {string}', async ({ page }, name) => {
  await page.getByRole('link', { name }).click();
});

Then('I see in title {string}', async ({ page }, keyword) => {
  await expect(page).toHaveTitle(new RegExp(keyword));
});
