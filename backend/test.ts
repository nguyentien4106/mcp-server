import { test, expect } from '@playwright/test';

test.describe('Affiliate CPA Report Page Tests', () => {
  test('Login and navigate to Affiliate CPA Report page', async ({ page }) => {
    // 1. Navigate to login page and input credentials
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    await expect(page.locator('text=Affiliate CPA Report')).toBeVisible();
  });

  test('Inspect Date Range selector', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 2. Inspect the Date Range selector for correct display and functionality.
    await expect(page.locator('text=Date Range')).toBeVisible();
    // Add more specific checks for functionality, e.g., selecting a date range
    await page.click('text=Date Range');
    await page.click('text=Today');
    //Verify the date is selected
    await expect(page.locator('text=Today')).toBeVisible();
  });

  test('Inspect Affiliate filter', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 3. Inspect the Affiliate filter for correct display and functionality.
    await expect(page.locator('text=Affiliate')).toBeVisible();
    // Add more specific checks for functionality, e.g., selecting an affiliate
    await page.click('text=Affiliate');
    await page.click('text=All');
    await expect(page.locator('text=All')).toBeVisible();
  });

  test('Inspect Campaign filter', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 4. Inspect the Campaign filter for correct display and functionality.
    await expect(page.locator('text=Campaign')).toBeVisible();
    // Add more specific checks for functionality, e.g., selecting a campaign
    await page.click('text=Campaign');
    await page.click('text=All');
    await expect(page.locator('text=All')).toBeVisible();
  });

  test('Inspect Sub ID filter', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 5. Inspect the Sub ID filter for correct display and functionality.
    await expect(page.locator('text=Sub ID')).toBeVisible();
    // Add more specific checks for functionality, e.g., inputting a Sub ID
    await page.fill('text=Sub ID', 'testSubID');
    await expect(page.locator('text=testSubID')).toBeVisible();
  });

  test('Inspect Export button', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 6. Inspect the Export button for correct display and functionality.
    await expect(page.locator('text=Export')).toBeVisible();
    // Add more specific checks for functionality, e.g., clicking the export button
    await page.click('text=Export');
  });

  test('Inspect column headers', async ({ page }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // 7. Inspect the column headers for correct display and correct text.
    const columnHeaders = ['Date', 'Affiliate', 'Campaign', 'Sub ID', 'Clicks', 'Impressions', 'Conversions', 'CPA', 'Revenue', 'Profit']; // Replace with actual column headers
    for (const header of columnHeaders) {
      await expect(page.locator(`text=${header}`)).toBeVisible();
    }
  });

  test('Check responsiveness', async ({ page, browser }) => {
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
    await page.fill('text=Username', 'aaWalter');
    await page.fill('text=Password', '1234aa');
    await page.click('text=Login');

    // Wait for navigation to the dashboard or successful login
    await page.waitForLoadState('networkidle');

    // Navigate to Affiliate CPA Report page. Assuming there's a link with the text "Affiliate CPA Report"
    await page.click('text=Affiliate CPA Report');

    // Wait for the Affiliate CPA Report page to load
    await page.waitForLoadState('networkidle');
    // Check responsiveness of the entire page by resizing the browser window.
    const windowSizes = [{width: 600, height: 800}, {width: 1200, height: 800}];

    for (const size of windowSizes) {
      await page.setViewportSize(size);
      await page.waitForTimeout(200); // Small delay to allow re-rendering
      await expect(page.locator('text=Affiliate CPA Report')).toBeVisible();
    }
  });
});