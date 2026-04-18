import { test, expect } from '@playwright/test';

// ─────────────────────────────────────────────
// These tests run against example.com so they
// work immediately without any setup.
// Replace the URL with your actual app URL later.
// ─────────────────────────────────────────────

test.describe('Homepage checks', () => {

  test('page loads and has a title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Example Domain/i);
  });

  test('page contains main heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Example Domain');
  });

  test('page has a working link', async ({ page }) => {
    await page.goto('/');
    const link = page.locator('a');
    await expect(link).toBeVisible();
  });

});

test.describe('Basic navigation', () => {

  test('page responds with 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('page loads within 5 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/');
    const duration = Date.now() - start;
    expect(duration).toBeLessThan(5000);
  });

});
