import { test } from '@playwright/test';

test('add a recipe', async ({ page }) => {
	await page.goto('/recipes');
	await page.getByLabel('Title').fill('Quiche');
	await page.getByLabel('Description').fill('Very delicious!');
	
});
