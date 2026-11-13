import { test, expect } from '../fixtures/baseTest';
import checkoutData from '../data/checkoutData.json';

test.describe('Coffee Cart E2E & Bonus Features', () => {
  test('Complete checkout flow with 3rd-item promo popup', async ({ menuPage }) => {
    const { first, second, third } = checkoutData.drinks;
    const { name, email } = checkoutData.customer;

    // Add 3 items to trigger the 3rd-item promo popup (Bonus c)
    await menuPage.addCoffee(first);
    await menuPage.addCoffee(second);
    await menuPage.addCoffee(third);

    await expect(menuPage.promoBanner).toBeVisible();
    await menuPage.handlePromoPopup(true);

    // Checkout and verify success snackbar
    await menuPage.checkoutAndPay(name, email);
    await expect(menuPage.successSnackbar).toContainText('Thanks for your purchase');
  });

  test('Bonus (a): Double-click coffee title translates to Chinese', async ({ menuPage }) => {
    const title = menuPage.getCoffeeTitle('Espresso');
    await title.dblclick();
    await expect(title).toContainText('特浓咖啡');
  });

  test('Bonus (b): Right-click coffee icon opens add-to-cart dialog', async ({ menuPage, page }) => {
    await menuPage.getCoffeeCup('Espresso').click({ button: 'right' });
    const confirmDialog = page.locator('dialog[open]');
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole('button', { name: 'Yes' }).click();
    await expect(menuPage.checkoutButton).toContainText('Total: $10.00');
  });
});