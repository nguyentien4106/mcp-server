// test-suite-for-affiliate-cpa-report-page.spec.ts
import { test, expect } from '@playwright/test';

test('AffiliateCPAReportTest', async ({ page }) => {
  // Navigate to https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login
  await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');
  // Type 'aaWalter' into the username field
  await page.locator('input[name="UserName"]').type('aaWalter');
  // Type '1234aa' into the password field
  await page.locator('input[name="Password"]').type('1234aa');
  // Click the login button
  await page.locator('button[type="submit"]').click();
  // Navigate to the Affiliate CPA Report page
  // Assuming there is a link or button to navigate to the Affiliate CPA Report page, replace 'Affiliate CPA Report' with the actual locator
  await page.goto('https://aff-12bet.nexdev.net/YOUR_AFFILIATE_CPA_REPORT_PAGE_URL'); // Replace with the actual URL
  // Observe the loading time
  const startTime = Date.now();
  await page.waitForLoadState('networkidle');
  const endTime = Date.now();
  const loadingTime = endTime - startTime;
  console.log(`Loading time: ${loadingTime}ms`);
  // Verify that all columns are present and populated with data for the default date range
  // Replace with the actual column locators
  const columns = ['Column 1', 'Column 2', 'Column 3']; // Replace with the actual column names
  for (const column of columns) {
    await expect(page.locator(`th:has-text("${column}")`)).toBeVisible();
    // Verify that the column has data
    const firstDataCell = page.locator(`td:nth-child(${columns.indexOf(column) + 1})`);
    await expect(firstDataCell).not.toBeEmpty();
  }
  // Check if there are any error messages or broken elements on the page
  // Check for error messages
  const errorMessages = await page.locator('.error, .alert, .danger').allTextContents();
  expect(errorMessages.length).toBe(0);
  // Check for broken images
  const brokenImages = await page.locator('img[src]').evaluateAll(imgs => {
    return imgs.filter(img => !img.complete || (typeof img.naturalWidth !== "undefined" && img.naturalWidth === 0)).length;
  });
  expect(brokenImages).toBe(0);
});