import { test, expect } from '@playwright/test';

// Тест 1: Зөв username болон password ашиглан амжилттай нэвтрэх
test('Амжилттай нэвтрэх', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ
  await page.goto('https://www.saucedemo.com/');

  // Username оруулна
  await page.getByPlaceholder('Username').fill('standard_user');

  // Password оруулна
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login товчийг дарна
  await page.getByRole('button', { name: 'Login' }).click();

  // Products текст харагдаж байгаа эсэхийг шалгана
await expect(page.getByText('Products')).toBeVisible();

  // URL inventory хуудас руу өөрчлөгдсөн эсэхийг шалгана
  await expect(page).toHaveURL(/inventory/);

  // Products гарчиг зөв тексттэй эсэхийг шалгана
  await expect(page.locator('.title')).toHaveText('Products');

  // Logout хийх
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByText('Logout').click();
});


// Тест 2: Буруу password ашиглан нэвтрэх
test('Амжилтгүй нэвтрэх', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ
  await page.goto('https://www.saucedemo.com/');

  // Зөв username оруулна
  await page.getByPlaceholder('Username').fill('standard_user');

  // Буруу password оруулна
  await page.getByPlaceholder('Password').fill('wrong_password');

  // Login товчийг дарна
  await page.getByRole('button', { name: 'Login' }).click();

  // Алдааны message харагдаж байгаа эсэхийг шалгана
  await expect(
    page.getByText('Username and password do not match')
  ).toBeVisible();
});


// Тест 3: Нэвтэрсний дараа бараа сагслах
test('Бараа сагсанд нэмэх', async ({ page }) => {

  // SauceDemo веб сайтыг нээнэ
  await page.goto('https://www.saucedemo.com/');

  // Login мэдээлэл оруулна
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');

  // Login хийнэ
  await page.getByRole('button', { name: 'Login' }).click();

  // Products хуудас нээгдсэн эсэхийг шалгана
  await expect(page.getByText('Products')).toBeVisible();

  // Эхний барааг сагсанд нэмнэ
  await page.getByRole('button', { name: 'Add to cart' }).first().click();

  // Cart дээр 1 бараа байгаа эсэхийг шалгана
  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

  // Shopping cart руу орно
  // Shopping cart руу орно
await page.locator('.shopping_cart_link').click();

  // Sauce Labs Backpack сагсанд орсон эсэхийг шалгана
  await expect(page.getByText('Sauce Labs Backpack')).toBeVisible();

  // Logout хийх
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.getByText('Logout').click();
});
