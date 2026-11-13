# Coffee Cart — Playwright TypeScript Automation Framework

End-to-end UI automation framework for [coffee-cart.app](https://coffee-cart.app/), architected for maintainability and team scalability using the **Page Object Model (POM)**, **custom Playwright fixtures**, **isolated JSON test data**, and **GitHub Actions CI**.

---

## Project Architecture

```text
coffee-cart-playwright/
├── .github/
│   └── workflows/
│       └── playwright.yml      # Automated CI pipeline on push & pull requests
├── data/
│   └── checkoutData.json       # Externalized test data isolated from test logic
├── fixtures/
│   └── baseTest.ts             # Custom page setup & localStorage teardown
├── pages/
│   └── MenuPage.ts             # Resilient locators & reusable page actions
├── tests/
│   └── coffeeCart.spec.ts      # E2E checkout & bonus feature test specs
├── playwright.config.ts        # Playwright runner & reporting configuration
└── tsconfig.json               # TypeScript compiler configuration

Automated Test Coverage
Core E2E Checkout Flow (Complete checkout flow with 3rd-item promo popup)
Adds 3 drinks from externalized test data, detects and accepts the 3rd-item promo banner, submits checkout details, and verifies the purchase confirmation snackbar.
Bonus (a) — Localization (Double-click coffee title translates to Chinese)
Double-clicks a product heading (Espresso) and asserts dynamic translation (特浓咖啡).
Bonus (b) — Context Menu Interaction (Right-click coffee icon opens add-to-cart dialog)
Triggers a right-click context dialog on a coffee icon, confirms addition, and verifies the updated cart total ($10.00).
Bonus (c) — Promo Pop-Up Trigger
Validates that adding every 3rd item triggers the discounted promo offer banner.

Design Principles Enforced
Zero Hardcoded Waits: Relies exclusively on Playwright's auto-waiting and web-first assertions (expect(locator).toBeVisible(), toContainText()).
Resilient Locators: Uses user-facing roles (getByRole, getByLabel) and data-test attributes rather than brittle CSS/XPath chains.
Test Isolation: Custom fixtures reset localStorage during teardown so every test executes independently in a clean browser state.

Local Setup & Execution
Bash
# 1. Install dependencies
npm ci

# 2. Install Playwright browsers
npx playwright install --with-deps chromium

# 3. Run the test suite
npx playwright test

# 4. View the HTML execution report
npx playwright show-report
