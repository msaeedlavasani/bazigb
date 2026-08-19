# راهنمای استقرار BaziGB (Deployment Runbook)

این مستند مراحل استقرار و به‌روزرسانی پلتفرم روی سرور پروداکشن را شرح می‌دهد.

## سرور پروداکشن (واقعی)

- **IP:** `193.151.153.204` (root)
- **دامنه:** `https://bazigb.ir` (Caddy — SSL خودکار)
- **مسیر پروژه:** `/opt/bazigb`
- **دیپلوی:** از ماشین لوکال با **rsync مستقیم** (کلید SSH سرور به GitHub وصل نیست — روش `git pull` روی سرور **کار نمی‌کند**)

## معماری

```
کاربر (HTTPS)
   │
   ▼
Caddy (پورت 80/443 — SSL خودکار)
   ├── /api/*        → NestJS Server (پورت 3001)
   ├── /socket.io/*  → NestJS Server (WebSocket)
   └── سایر مسیرها   → Next.js Web (پورت 3000)
                          │
PostgreSQL 16 ◄───────────┘ (دیتابیس مشترک، volume: pgdata)
```

## فایل `.env` (بسیار مهم ⚠️)

- فایل `.env` در `/opt/bazigb` **در git نیست** و در rsync **exclude** می‌شود؛ فقط یک بار به صورت دستی ساخته می‌شود.
- متغیرهای مورد نیاز (از `.env.example`):

| متغیر | توضیح |
|---|---|
| `POSTGRES_PASSWORD` | رمز دیتابیس |
| `JWT_SECRET` | کلید امضای توکن (`openssl rand -hex 32`) |
| `DOMAIN` | `bazigb.ir` |
| `ALLOWED_ORIGINS` | `https://bazigb.ir,https://www.bazigb.ir` |
| `SMSIR_API_KEY` | کلید Production پیامک sms.ir |
| `SMSIR_TEMPLATE_ID` | شناسه قالب OTP (مثلاً `997360`) |

- اگر `.env` گم شد، مقادیر را از کانتینر در حال اجرا بازیابی کنید:

```bash
docker inspect bazigb-server-1 --format='{{range .Config.Env}}{{println .}}{{end}}'
```

- **نکته بیلد:** متغیرهای SMS باید در بخش `environment` سرویس `server` در `docker-compose.yml` هم تعریف شوند (نه فقط `.env`).

## دیپلوی جدید (روش فعلی)

### ۱. انتقال کدها از لوکال به سرور

```bash
# از ریشه‌ی ریپو (لوکال):
rsync -az --delete \
  --exclude={.git,node_modules,.next,dev.db,.env,dist} \
  ./ root@193.151.153.204:/opt/bazigb/
```

> اگر رمز SSH دارید، از `sshpass -p '<pass>' rsync ...` استفاده کنید؛ در غیر این صورت `expect` یا کلید SSH.

### ۲. بیلد و ری‌استارت روی سرور

```bash
ssh root@193.151.153.204
cd /opt/bazigb
docker compose --env-file .env build server web
docker compose --env-file .env up -d --force-recreate server web
```

> بیلد کامل ~۱۲–۲۵ دقیقه طول می‌کشد. برای اجرای پس‌زمینه: `nohup docker compose ... > deploy.log 2>&1 &` و سپس `tail -f deploy.log`.

> سرور هنگام بالا آمدن، مایگریشن‌های Prisma را خودکار اعمال می‌کند.

## دستورات کاربردی

| دستور | کار |
|---|---|
| `docker compose ps` | وضعیت کانتینرها |
| `docker compose logs -f server` | لاگ سرور |
| `docker compose logs -f web` | لاگ وب |
| `docker compose logs caddy` | بررسی پروکسی /socket.io |
| `docker compose exec db psql -U bazigb -d bazigb` | دسترسی به دیتابیس |
| `docker restart bazigb-web-1` | ری‌استارت وب (مثلاً بعد از افزودن فایل به `public/`) |
| `bash scripts/restart-server.sh` | ری‌استارت سریع سرور ۳۰۰۱ (لاگ: `/tmp/bazigb_server_3001.log`) |

> ⚠️ **فایل‌های `public/`:** سرور standalone نکست لیست `public/` را هنگام استارت کش می‌کند — بعد از افزودن فایل جدید، کانتینر وب باید ری‌استارت یا ری‌بیلد شود.

## تأیید صحت دیپلوی

1. **وب:** `curl -s https://bazigb.ir | grep '<title>'` — عنوان صفحه باید بازگردد.
2. **API:** `curl -s https://bazigb.ir/api/rooms` — باید آرایه برگرداند.
3. **دریافت OTP:** `curl -s -X POST https://bazigb.ir/api/auth/otp/request -H 'Content-Type: application/json' -d '{"phone":"09xxxxxxxxx"}'` — باید `{"sent":true}` برگردد.
4. **بازی:** دو تب مرورگر باز کنید، اتاق بسازید و یک بازی کامل انجام دهید.
5. **لاگ OTP:** اگر پیامک نرسید، لاگ سرور را برای `[OTP dev-mode]` چک کنید (نشانه‌ی نرسیدن کلید به کانتینر).

## عیب‌یابی

| مشکل | راه‌حل |
|---|---|
| `required variable DOMAIN is missing` | فایل `.env` در `/opt/bazigb` نیست — آن را بسازید/بازیابی کنید |
| سرور بالا نمی‌آید (Restarting) | `docker compose logs server` — معمولاً `DATABASE_URL` یا مایگریشن |
| بیلد وب با خطای `unstable_createUseMediaQuery` | مشکل `@next/swc` — `scripts/fetch-swc.mjs` نسخه swc را با `optionalDependencies` نکست هم‌تراز کند (۱۴.2.33) |
| OTP کار نمی‌کند | چک کنید `SMSIR_API_KEY` در `environment` داکر‌کامپوز هم تعریف شده باشد |
| CORS خطا | `ALLOWED_ORIGINS` را در `.env` تنظیم و server+caddy ری‌استارت کنید |
| سوکت وصل نمی‌شود | `docker compose logs caddy` — مسیر `/socket.io/*` باید به server پروکسی شود |
| SSL فعال نشد | `DOMAIN` در `.env` + رکورد DNS به IP سرور |

## امنیت

- [ ] `chmod 600 .env` روی سرور
- [ ] پورت‌های غیرضروری بسته (فقط 22، 80، 443)
- [ ] `JWT_SECRET` واقعاً تصادفی
- [ ] ترجیحاً SSH با کلید به‌جای رمز
- [ ] `.env` در git کامیت نشود (در `.gitignore`)
