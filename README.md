# F.CSA313 – Software Quality Assurance & Testing

## Lab 1: UI Automated Testing with Playwright

### 1. Лабораторийн зорилго

Энэхүү лабораторийн ажлын зорилго нь Playwright ашиглан веб системийн хэрэглэгчийн интерфейсийг автоматжуулан тестлэх, орчин үеийн locator болон assertion ашиглах, тестийн алдааг Trace Viewer ашиглан шинжлэх үндсэн ойлголтыг эзэмшихэд оршино.

Тестийн жишээ системээр **SauceDemo** веб сайтыг ашигласан.

---

## 2. Ашигласан технологи

* **Programming Language:** TypeScript
* **Testing Framework:** Playwright
* **Runtime:** Node.js
* **IDE:** Visual Studio Code
* **Browser:** Chromium, Firefox, WebKit
* **Website:** SauceDemo
* **Version Control:** Git / GitHub

---

## 3. Хийсэн тестүүд

### Тест 1 – Амжилттай нэвтрэх

Энэ тестээр зөв username болон password ашиглан системд амжилттай нэвтэрч байгаа эсэхийг шалгасан.

**Тестийн алхам:**

1. SauceDemo веб сайтыг нээх.
2. Username талбарт `standard_user` оруулах.
3. Password талбарт `secret_sauce` оруулах.
4. Login товч дарах.
5. Products хуудас харагдаж байгаа эсэхийг шалгах.
6. URL нь inventory хуудас руу шилжсэн эсэхийг шалгах.
7. Logout хийх.

**Ашигласан assertion:**

* `toBeVisible()`
* `toHaveURL()`
* `toHaveText()`

---

### Тест 2 – Амжилтгүй нэвтрэх

Энэ тестээр буруу password оруулсан үед систем алдааны мэдээлэл зөв харуулж байгаа эсэхийг шалгасан.

**Тестийн алхам:**

1. SauceDemo веб сайтыг нээх.
2. Username талбарт `standard_user` оруулах.
3. Буруу password оруулах.
4. Login товч дарах.
5. Username болон password буруу гэсэн алдааны мэдээлэл харагдаж байгаа эсэхийг шалгах.

**Шалгасан алдааны мэдээлэл:**

`Username and password do not match`

**Ашигласан assertion:**

* `toBeVisible()`

---

### Тест 3 – Бараа сагсанд нэмэх

Энэ тестээр хэрэглэгч амжилттай нэвтэрсний дараа бараа сонгон сагсанд нэмэх үйлдэл зөв ажиллаж байгаа эсэхийг шалгасан.

**Тестийн алхам:**

1. SauceDemo веб сайтыг нээх.
2. Зөв username болон password оруулах.
3. Login хийх.
4. Products хуудас нээгдсэн эсэхийг шалгах.
5. Барааг сагсанд нэмэх.
6. Cart badge дээр `1` гэсэн тоо гарсан эсэхийг шалгах.
7. Shopping Cart руу орох.
8. `Sauce Labs Backpack` бараа сагсанд байгаа эсэхийг шалгах.
9. Logout хийх.

**Ашигласан assertion:**

* `toBeVisible()`
* `toHaveText()`

---

## 4. Locator

Playwright тестүүдэд веб хуудсан дээрх элементүүдийг олохын тулд locator ашигласан.

Энэ лабораторид дараах locator-уудыг ашигласан:

### getByRole()

Товч болон бусад accessibility role-той элементүүдийг олоход ашигласан.

```typescript
page.getByRole('button', { name: 'Login' })
```

### getByPlaceholder()

Input талбарыг placeholder утгаар нь олоход ашигласан.

```typescript
page.getByPlaceholder('Username')
page.getByPlaceholder('Password')
```

### getByText()

Тодорхой текст агуулсан элементийг олоход ашигласан.

```typescript
page.getByText('Products')
page.getByText('Sauce Labs Backpack')
```

### locator()

```typescript
page.locator('.shopping_cart_link')
page.locator('.shopping_cart_badge')
```

Товч, гарчгийг accessibility role болон харагдах текстээр сонгосон. Сагсны холбоос, тоолуурт SauceDemo-ийн markup-д зориулалтын accessible name эсвэл test ID байхгүй тул CSS selector ашигласан. Username болон password талбар дээр placeholder locator хэрэглэсэн.

### Яагаад XPath ашиглаагүй вэ?

XPath нь DOM-ийн бүтэцтэй илүү их хамааралтай байдаг тул веб хуудасны бүтэц өөрчлөгдөхөд locator эвдрэх магадлалтай. Харин Playwright-ийн `getByRole()`, `getByText()`, `getByPlaceholder()` зэрэг locator-ууд нь хэрэглэгчийн харилцах арга болон accessibility мэдээлэлд тулгуурладаг. Иймээс тестийг илүү ойлгомжтой, найдвартай, засварлахад хялбар болгохын тулд XPath ашиглаагүй.

---

## 5. Assertion

Assertion нь тестийн үед системээс хүлээж буй үр дүн бодитоор гарсан эсэхийг шалгадаг.

Энэ лабораторид дараах assertion-уудыг ашигласан.

### toBeVisible()

Элемент хэрэглэгчид харагдаж байгаа эсэхийг шалгана.

```typescript
await expect(page.getByRole('heading', { name: 'Products' })).toBeVisible();
```

### toHaveURL()

Хуудасны URL зөв эсэхийг шалгана.

```typescript
await expect(page).toHaveURL(/inventory/);
```

### toHaveText()

Элементийн текст зөв эсэхийг шалгана.

```typescript
await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
```

---

## 6. Trace Viewer ашигласан

Playwright-ийн Trace Viewer ашиглан тестийн гүйцэтгэлийн алхамуудыг шалгасан.

Trace үүсгэхийн тулд:

```powershell
npx playwright test tests/mytest.spec.ts --project=chromium --trace on
```

Trace файл үүссэний дараа:

```powershell
npx playwright show-trace "test-results/mytest-Бараа-сагсанд-нэмэх-chromium/trace.zip"
```

командыг ашиглан Trace Viewer-ийг нээнэ. HTML тайлан нь `artifacts/playwright-report/` хавтаст хадгалагдана.

Assertion алдаатай үед Trace Viewer-ээр алхам, screenshot болон алдааны шалтгааныг шалгах туршилтыг дараах байдлаар хийж болно:

```typescript
await expect(page.getByRole('heading', { name: 'Products' })).toHaveText('WRONG TEXT');
```

Туршилтын дараа assertion-ийг зөв утгад нь буцааж, амжилттай тест болон тайланг дахин үүсгэнэ.

---

## 7. Playwright ба Selenium-ийн харьцуулалт

Playwright болон Selenium нь веб системийн автомат тест хийхэд ашиглагддаг framework-ууд юм. Selenium нь олон жилийн турш ашиглагдаж ирсэн бөгөөд олон төрлийн browser болон programming language дэмждэг. Харин Playwright нь Microsoft-ийн хөгжүүлсэн орчин үеийн веб тестийн framework бөгөөд Chromium, Firefox, WebKit browser-уудыг дэмждэг. Playwright нь element locator болон auto-waiting механизмтай тул элемент бэлэн болохыг автоматаар хүлээж чаддаг. Мөн `getByRole()`, `getByText()`, `getByLabel()` зэрэг хэрэглэгчийн харилцаанд суурилсан locator ашиглах боломжтой. Playwright нь screenshot, video болон Trace Viewer зэрэг debugging боломжуудыг шууд дэмждэг. Selenium-д зарим тохиолдолд browser driver болон нэмэлт тохиргоо шаардлагатай байдаг бол Playwright нь browser automation орчныг илүү нэгдсэн байдлаар хангадаг. Мөн Playwright нь parallel testing хийх боломжтой бөгөөд энэ нь олон тестийг зэрэг ажиллуулахад ашиглагддаг. Selenium нь олон төрлийн төсөл болон legacy системтэй нийцүүлэхэд өргөн хэрэглэгддэг хэвээр байна. Ерөнхийдөө энэ лабораторийн ажлын хүрээнд Playwright ашиглан UI тест бичих, locator болон assertion хэрэглэх, Trace Viewer ашиглан алдааг шинжлэх боломжийг туршиж үзсэн.

---

## 8. Дүгнэлт

Энэхүү лабораторийн ажлаар Playwright ашиглан веб системийн UI автомат тестийг хэрэгжүүлсэн. Зөв нэвтрэх, буруу нэвтрэх болон нэвтэрсний дараа барааг сагсанд нэмэх гэсэн 3 үндсэн тестийг боловсруулсан. Тестүүдэд `getByRole()`, `getByPlaceholder()`, `getByText()` болон шаардлагатай газарт CSS locator ашигласан. Мөн `toBeVisible()`, `toHaveURL()`, `toHaveText()` assertion-уудыг ашиглан үр дүнг шалгасан. Trace Viewer болон HTML тайлан нь тестийн алхам, үр дүнг шинжлэхэд тусална. Энэхүү ажлаар вебийн UI тестийг автоматжуулах үндсэн аргачлалтай танилцсан.

## 9. Төслийг ажиллуулах

Node.js 20 буюу түүнээс дээш хувилбар шаардлагатай.

```powershell
npm install
npx playwright install
npm test
npm run report
```

`npm test` нь Chromium, Firefox, WebKit дээрх тестүүдийг ажиллуулж HTML тайланг үүсгэнэ. Зөвхөн Chromium дээр Trace үүсгэн ажиллуулах бол `npm run test:chromium` командыг ашиглана. Алдаатай нэвтрэх тестэд хэрэглэгч амжилттай нэвтэрдэггүй тул logout хийх идэвхтэй session үүсэхгүй; нөгөө хоёр тест амжилттай дуусахдаа logout хийнэ.
