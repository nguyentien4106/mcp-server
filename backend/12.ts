import { test, expect } from '@playwright/test';

test.describe('Affiliate CPA Report Access Test', () => {
  const userName = 'testuser'; // Replace with actual username
  const password = 'testpassword'; // Replace with actual password
  const baseUrl = '123'; // Replace with the actual base URL

  test('should verify access to Affiliate CPA report', async ({ page }) => {
    // 1. Navigate to URL and input username and password
    await page.goto(baseUrl);
    await page.fill('input[name="username"]', userName);
    await page.fill('input[name="password"]', password);
    await page.click('button:has-text("Login")'); // Assuming a login button with text "Login"

    // 2. Navigate to the Report menu
    // Assuming the report menu has a specific text, e.g., "Reports"
    try {
      await page.click('text=Reports');
    } catch (error) {
      console.warn('Report menu not found, assuming it is hidden.');
      // If the report menu is not found, we can assume it's hidden and skip to step 3.
    }

    // 3. Verify that the Report menu is hidden or the Affiliate CPA option isn't there.
    // We'll try to find the "Affiliate CPA" option. If it's not there, the test passes at this point.
    const affiliateCPAOption = await page.locator('text=Affiliate CPA');
    const affiliateCPAExists = await affiliateCPAOption.isVisible();

    if (!affiliateCPAExists) {
      console.log('Affiliate CPA option is not visible, test passes.');
      return; // Test passes because the option is not available.
    }

    // 4. If report menu is available, click on 'Affiliate CPA'.
    await page.click('text=Affiliate CPA');

    // 5. Verify that a permission denied page is displayed.
    // Assuming the permission denied page has specific text, e.g., "Permission Denied" or "Unauthorized"
    await expect(page.locator('text=Permission Denied')).toBeVisible();
  });
});