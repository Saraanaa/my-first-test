import { test, expect } from '@playwright/test';

// Тест 1: Зөв хэрэглэгчийн мэдээллээр амжилттай нэвтэрч, дараа нь гарах.
test('Амжилттай нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Барааны жагсаалтын хуудас нээгдэж, гарчиг зөв болохыг шалгана.
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
  await expect(page).toHaveURL(/inventory/);

  // Тест бүр өөрийн browser context ашигладаг; амжилттай нэвтэрсэн энэ урсгалаас гарна.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

// Тест 2: Буруу нууц үгэнд алдааны мэдэгдэл гарч, нэвтрэхгүй байх.
test('Амжилтгүй нэвтрэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны мэдэгдэл харагдаж, хэрэглэгч inventory хуудас руу шилжээгүйг шалгана.
  await expect(page.getByRole('alert')).toContainText(
    'Username and password do not match any user in this service',
  );
  await expect(page).not.toHaveURL(/inventory/);
});

// Тест 3: Барааг сагсанд нэмж баталгаажуулсны дараа logout хийх.
test('Бараа сагсанд нэмэх', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();

  // Нэртэй locator болон test id ашиглаж бараа, сагсны төлөвийг шалгана.
  await page.getByRole('button', { name: 'Add to cart' }).first().click();
  await expect(page.getByTestId('shopping-cart-badge')).toHaveText('1');
  await page.getByTestId('shopping-cart-link').click();
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Сагсны хуудсаас меню нээж энэ тестийн сессийг хаана.
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});
