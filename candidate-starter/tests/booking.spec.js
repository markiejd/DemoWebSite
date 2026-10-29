import { test, expect } from '@playwright/test';

test('cinema opens with one adult ticket', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Make a night of it.' })).toBeVisible();
  await expect(page.getByTestId('adults')).toHaveValue('1');
  await expect(page.getByTestId('total')).toHaveText('£13.50');
});