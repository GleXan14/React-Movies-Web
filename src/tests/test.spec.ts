import { test } from '@playwright/test';

test('basic test', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Click input[type="text"]
    await page.locator('input[type="text"]').click();

    // Fill input[type="text"]
    await page.locator('input[type="text"]').fill('avengers');

    // Press Enter
    await page.locator('input[type="text"]').press('Enter');
    // assert.equal(page.url(), 'http://localhost:3000/movies?search=avengers&page=1');

    // Click img[alt="Avengers\: Endgame"]
    await page.locator('img[alt="Avengers\\: Endgame"]').click();
    // assert.equal(page.url(), 'http://localhost:3000/movie/299534');

    // Click text=Back
    await page.locator('text=Back').click();
    // assert.equal(page.url(), 'http://localhost:3000/movies?search=avengers&page=1');

    // Click img[alt="Avengers\: Infinity War"]
    await page.locator('img[alt="Avengers\\: Infinity War"]').click();
    // assert.equal(page.url(), 'http://localhost:3000/movie/299536');

    // Click text=Back
    await page.locator('text=Back').click();
    // assert.equal(page.url(), 'http://localhost:3000/movies?search=avengers&page=1');

    // Click img[alt="Avengers\: Age of Ultron"]
    await page.locator('img[alt="Avengers\\: Age of Ultron"]').click();
    // assert.equal(page.url(), 'http://localhost:3000/movie/99861');

    // Click text=Back
    await page.locator('text=Back').click();
    // assert.equal(page.url(), 'http://localhost:3000/movies?search=avengers&page=1');

    // Click img[alt="The Avengers"] >> nth=0
    await page.locator('img[alt="The Avengers"]').first().click();
    // assert.equal(page.url(), 'http://localhost:3000/movie/24428');

    // Click button:has-text("Back")
    await page.locator('button:has-text("Back")').click();
    // assert.equal(page.url(), 'http://localhost:3000/movies?search=avengers&page=1');

    // Click text=Home
    await page.locator('text=Home').click();
    // assert.equal(page.url(), 'http://localhost:3000/');

    await page.pause();
});



