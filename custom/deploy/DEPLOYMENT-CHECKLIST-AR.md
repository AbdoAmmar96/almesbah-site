# 🚀 رفع ALMESBAH — Checklist تنفيذية (cPanel / استضافة مشتركة)

> **قرار متفق عليه:** تنظيف الفهرسة (GSC / Removals / مراقبة السبام) **مؤجّل لحين الرفع الفعلي** — موجود في آخر الملف كقسم Parked علشان ميتنسيش.

---

## المرحلة 0 — على جهازك (قبل أي حاجة على السيرفر)

- [ ] `./setup.sh` ثم `cp -r custom/. almesbah/`
- [ ] `cd almesbah && composer install --optimize-autoloader --no-dev`
- [ ] `npm install && npm run build` ← لازم يطلع مجلد `public/build/`
- [ ] تجربة محلية سريعة: `/en` و `/dashboard` شغالين
- [ ] **غيّر التوكن** في `public/install.php` (سطر `INSTALL_TOKEN`)
- [ ] احذف `node_modules/` قبل الضغط، واضغط المشروع zip

## المرحلة 1 — نسخة أمان من الموقع القديم (إلزامي — 10 دقايق)

- [ ] cPanel → File Manager → ضغط مجلد الموقع القديم كله ← نزّله على جهازك
- [ ] phpMyAdmin → Export لقاعدة بيانات WordPress ← نزّلها
- [ ] سيب النسخ دي عندك 30 يوم على الأقل (أدلة الاختراق + رجوع طوارئ)

## المرحلة 2 — الرفع

- [ ] ارفع zip المشروع وفكّه (File Manager أسرع من FTP)
- [ ] **Document Root:**
  - **طريقة A (الأفضل):** cPanel → Domains → عدّل الدوكروت إلى `.../almesbah/public`
  - **طريقة B (لو مقفولة):** حط محتوى المشروع في `public_html/` وانسخ `deploy/root.htaccess` باسم `.htaccess` في الجذر
- [ ] MySQL Databases → أنشئ DB + User + اربطهم (All Privileges) — سجّل الأسماء
- [ ] انسخ `.env.production.example` إلى `.env` واملأ `DB_*` و `APP_URL`

## المرحلة 3 — التشغيل (اختار واحدة)

**A) Terminal متاح:**
```bash
php artisan key:generate && php artisan migrate --force && php artisan db:seed --force
php artisan storage:link && php artisan config:cache && php artisan route:cache
```
**B) بدون Terminal:** افتح `https://الدومين/install.php?token=التوكن-بتاعك` — بيعمل كل حاجة ويحذف نفسه.

- [ ] لو `storage:link` فشل (symlink مقفول): انسخ `storage/app/public` → `public/storage` يدويًا
- [ ] صلاحيات: `storage/` و `bootstrap/cache/` = 775

## المرحلة 4 — SSL + فحص سريع (5 دقايق)

- [ ] SSL/TLS Status → Run AutoSSL ← وتأكد `APP_URL=https://...`
- [ ] افحص بإيدك:
  - `/en` الهوم بتحمّل بالخطوط والصور ✓
  - `/en/products/scutched-flax` صفحة منتج ✓
  - `/en/blog/scutched-vs-hackled-flax` مقال ✓
  - `/en/contact` ابعت استفسار تجريبي ← يظهر في `/dashboard` ✓
  - `/producti78` ← يعمل 301 لصفحة scutched-flax ✓
  - `/any-casino-page` ← **410** ✓
  - `/robots.txt` و `/sitemap.xml` ✓
- [ ] **غيّر باسورد الأدمن فورًا** + حط SMTP الحقيقي في `.env`

## المرحلة 5 — DNS (لو الاستضافة جديدة)

- [ ] وجّه A record للدومين على IP الاستضافة الجديدة — TTL ساعة
- [ ] الموقع القديم يفضل موجود كملفات أوفلاين فقط (مش أونلاين)

---

## 🅿️ Parked — تنظيف الفهرسة (تنفيذ يوم الرفع، مش قبله)

> متفق إننا نتجاهله دلوقتي — القائمة جاهزة يوم التنفيذ:

1. Google Search Console: إثبات ملكية الدومين (DNS TXT)
2. Submit `/sitemap.xml`
3. **Removals**: طلب إزالة لأسوأ روابط الكازينو (أعلى 20-30 URL من sitemap19 القديم)
4. URL Inspection للهوم + أهم 3 منتجات → Request Indexing
5. متابعة تقرير Pages أسبوعيًا: روابط السبام المفروض تتحول "Not found (410)" وتختفي خلال أسابيع
6. Baidu Webmaster (لما نبدأ الصيني): إثبات ملكية + sitemap
7. بعد 30 يوم استقرار: حذف نسخة WordPress القديمة نهائيًا من السيرفر
