import { expect, test } from '@playwright/test';

test.describe('Spotify E2E', () => {
  test('deve encontrar KING OF ROCK de Che ao pesquisar king of rock che', async ({
    page
  }) => {
    await page.goto('https://open.spotify.com/intl-pt/', {
      waitUntil: 'domcontentloaded'
    });

    const searchInput = page.getByRole('combobox', {
      name: 'O que você quer ouvir?'
    });
    await expect(searchInput).toBeVisible();
    await searchInput.fill('king of rock che');

    await expect(page).toHaveURL(/\/search\/king%20of%20rock%20che\/?$/);
    await expect(searchInput).toHaveValue('king of rock che');

    const song = page
      .getByRole('grid', {
        name: 'Resultados da busca de músicas',
        exact: true
      })
      .getByRole('row')
      .filter({ has: page.getByRole('link', { name: /^king of rock$/i }) })
      .filter({ has: page.getByRole('link', { name: /^che$/i }) });

    await expect(song).toHaveCount(1);
    await expect(song).toBeVisible();
  });
});
