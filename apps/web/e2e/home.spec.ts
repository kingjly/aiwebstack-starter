import { test, expect } from '@playwright/test';

test('homepage has correct elements', async ({ page }) => {
  await page.goto('/');

  // Check for the main heading
  const heading = page.locator('h1', { hasText: '全栈应用脚手架' });
  await expect(heading).toBeVisible();

  // Check for navigation buttons
  await expect(page.locator('text=进入 Dashboard')).toBeVisible();
  await expect(page.locator('text=查看组件')).toBeVisible();
});

test('navigation to components demo works', async ({ page }) => {
  await page.goto('/');

  // Click the components demo button
  await page.click('text=查看组件');

  // We should be on the components page
  await expect(page).toHaveURL(/.*\/demo\/components/);
  
  // Verify heading on the components page
  await expect(page.locator('h1', { hasText: 'UI 组件库' })).toBeVisible();
});
