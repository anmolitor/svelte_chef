import { expect, test } from '@playwright/test';

test('add a recipe', async ({ page }) => {
	await page.goto('/recipes');
	await page.getByLabel('Title').fill('Quiche');
	await page.getByLabel('Description').fill('Very delicious!');
	await page.getByText('Submit', { exact: true }).click();

	expect(await page.getByLabel('Title').textContent()).toBe('');
	expect(await page.getByLabel('Description').textContent()).toBe('');
	expect(await page.getByText('Quiche').count()).toBe(1);
});

test('navigate to the created recipe', async ({ page }) => {
	await page.goto('/recipes');
	await page.getByText('Quiche').click();
	expect(await page.getByText('Very delicious!').count()).toBe(1);
});
