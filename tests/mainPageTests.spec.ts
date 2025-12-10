import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';

test.describe('Feed all dogs on first page', async () => {
  const pageSize = 16;

  for (let i = 0; i < pageSize; i++) {
    test(`Feed dog #${i + 1}`, async ({ page }) => {
      const mainPage = new MainPage(page);

      await mainPage.goToMainPage();
      await mainPage.acceptCookies();
      await mainPage.sortDogsBy('Najmniej nakarmione');
      await mainPage.feedNthDog(i);
    });
  }
})





