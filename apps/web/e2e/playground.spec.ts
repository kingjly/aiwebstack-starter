import { test, expect } from '@playwright/test';

test('playground page loads and components are interactive', async ({ page }) => {
  await page.goto('/demo/playground');

  // Check the heading
  await expect(page.locator('h1', { hasText: '组件展示场' })).toBeVisible();

  // Test Dialog interaction
  const dialogTrigger = page.locator('text=打开对话框');
  await expect(dialogTrigger).toBeVisible();
  
  await dialogTrigger.click();
  
  // Wait for the dialog to open and verify its content
  const dialogPopup = page.locator('[role="dialog"]');
  await expect(dialogPopup).toBeVisible();
  await expect(dialogPopup.locator('h3', { hasText: '对话框标题' })).toBeVisible();
  
  // Close the dialog
  await dialogPopup.locator('text=取消').click();
  await expect(dialogPopup).not.toBeVisible();
  
  // Test Tabs interaction
  const tab1 = page.locator('[role="tab"]', { hasText: '概览' });
  const tab2 = page.locator('[role="tab"]', { hasText: '设置' });
  
  await expect(tab1).toHaveAttribute('aria-selected', 'true');
  
  await tab2.click();
  await expect(tab2).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('text=启用通知')).toBeVisible();
});
