import { expect, Locator, test, type Page } from '@playwright/test';

type sortType = 'Najbardziej nakarmione' | 'Najmniej nakarmione' | 'Według nazwy A-Z' | 'Według nazwy Z-A';


export class MainPage {
    private readonly page: Page;
    private readonly acceptCookiesButton: Locator;
    private readonly sortDropdown: Locator;
    private readonly dogTile: Locator;

    constructor(page: Page) {
        this.page = page;
        this.acceptCookiesButton = this.page.getByRole('button', { name: 'I Accept' });
        this.sortDropdown = this.page.locator('div.sort-select');
        this.dogTile = this.page.locator('div.single-pet').filter({ visible: true });
    }

    async goToMainPage(

    ): Promise<void> {
        return await test.step('Go to main page', async () => {
            this.page.goto('');
            await this.page.waitForLoadState('domcontentloaded');
        })
    }

    async acceptCookies(

    ): Promise<void> {
        return await test.step('Accept all cookies', async () => {
            await this.acceptCookiesButton.click();

            await this.page.waitForLoadState('domcontentloaded');
            await expect(this.acceptCookiesButton).not.toBeVisible();
        })
    }

    async sortDogsBy(
        sortBy: sortType
    ): Promise<void> {
        const currentSort = this.sortDropdown.locator('div.sort-select-current');

        await expect(currentSort).toBeVisible();

        if (await currentSort.textContent() !== sortBy) {
            await this.sortDropdown.click();
            await this.page.getByText(sortBy).click();
        }

        await this.page.waitForLoadState('domcontentloaded');
        await expect(currentSort).toHaveText(sortBy);
    }

    async feedNthDog(
        nth: number = 0 // nth >= 0
    ): Promise<void> {
        const feedDogButton = this.dogTile.nth(nth).getByText('Nakarm', {exact: true});
        const dogFedMessage = this.dogTile.nth(nth).getByText('Dziękujemy');

        await feedDogButton.scrollIntoViewIfNeeded();
        await expect(feedDogButton).toBeVisible();

        await feedDogButton.click();
        await expect(feedDogButton).not.toBeVisible();
        await expect(dogFedMessage).toBeVisible();
    }
}