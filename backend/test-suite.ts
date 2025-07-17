// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('AffiliateCPAReportTest', () => {
  test('test', async ({ page }) => {

    // Navigate to https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Login');

    // Type 'aaWalter' into the username field
    await page.locator('input[name="userName"]').fill('aaWalter');

    // Type '1234aa' into the password field
    await page.locator('input[name="password"]').fill('1234aa');

    // Click the login button
    await page.locator('button:has-text("Login")').click();

    // Wait for navigation and then navigate to the Affiliate CPA Report page
    await page.waitForURL('**/Portal/Home'); // Wait for successful login
    await page.goto('https://aff-12bet.nexdev.net/12BetAdmin1/Portal/Affiliate/AffiliateCpaReport'); // Replace with the actual URL of the Affiliate CPA Report page

    // Observe the loading time
    const startTime = Date.now();
    await page.waitForLoadState('networkidle');
    const endTime = Date.now();
    const loadingTime = endTime - startTime;
    console.log(`Loading time: ${loadingTime}ms`);

    // Verify that all columns are present and populated with data for the default date range
    const columnHeaders = await page.$$eval('th', headers => headers.map(header => header.textContent));
    console.log('Column Headers:', columnHeaders);
    expect(columnHeaders.length).toBeGreaterThan(0); // Check if there are any columns

    //Verify that at least one row of data is present
    const rowCount = await page.$$eval('tbody tr', rows => rows.length);
    console.log('Number of rows:', rowCount);
    expect(rowCount).toBeGreaterThan(0);

    // Check if there are any error messages or broken elements on the page
    // Check for specific error message elements or console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`Console error: ${msg.text()}`);
        expect(true).toBe(false); // Fail the test if there's a console error
      }
    });

    // Optionally, check for specific error message elements on the page
    const errorMessage = await page.locator('.error-message').textContent(); // Replace '.error-message' with the actual selector
    expect(errorMessage).toBeNull(); // Or expect(errorMessage).toBe(''); if the element is present but empty when no error
  });
});