import { Page, Locator, expect } from '@playwright/test';

export class MenuPage {
  readonly page: Page;
  readonly checkoutButton: Locator;
  readonly promoBanner: Locator;
  readonly acceptPromoButton: Locator;
  readonly skipPromoButton: Locator;
  readonly paymentModal: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly successSnackbar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.promoBanner = page.locator('.promo');
    this.acceptPromoButton = this.promoBanner.getByRole('button', { name: /Yes, of course!/i });
    this.skipPromoButton = this.promoBanner.getByRole('button', { name: /Nah, I'll skip/i });
    this.paymentModal = page.locator('.modal');
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successSnackbar = page.locator('.snackbar.success');
  }

  async goto() {
    await this.page.goto('https://coffee-cart.app/');
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  getCoffeeCup(name: string): Locator {
    return this.page.locator(`[aria-label="${name}"]`);
  }

  getCoffeeTitle(name: string): Locator {
    return this.page
      .locator('li')
      .filter({ has: this.page.locator(`[aria-label="${name}"]`) })
      .getByRole('heading');
  }

  async addCoffee(name: string) {
    await this.getCoffeeCup(name).click();
  }

  async handlePromoPopup(accept: boolean = true) {
    if (await this.promoBanner.isVisible()) {
      await (accept ? this.acceptPromoButton : this.skipPromoButton).click();
    }
  }

  async checkoutAndPay(name: string, email: string) {
    await this.checkoutButton.click();
    await expect(this.paymentModal).toBeVisible();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.submitButton.click();
  }
}