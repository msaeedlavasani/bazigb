# راهنمای استقرار BaziGB روی سرور (Deployment Runbook)

این مستند مراحل استقرار کامل پلتفرم روی یک VPS را شرح می‌دهد.

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
PostgreSQL 16 ◄───────────┘ (دیتابیس مشترک)
```

## پیش‌نیازها روی سرور

- **سیستم‌عامل:** Ubuntu 22.04 / 24.04 LTS
- **Docker + Docker Compose plugin:**

```bash
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
# خروج و ورود مجدد (یا: newgrp docker)
docker compose version   # باید نسخه ۲ نمایش دهد
```

## مرحله ۱ — دریافت کد روی سرور

> ⚠️ **مهم:** قبل از دیپلوی، تغییرات محلی باید در گیت **کامیت و پوش** شوند.
> فایل‌های جدید دیپلوی (Dockerfile.*، docker-compose.yml، Caddyfile، deploy.sh، .env.example، DEPLOY.md) و تغییرات وگاس همگی باید روی GitHub باشند.

```bash
# روی سرور:
cd /opt
git clone https://github.com/<username>/bazigb-main.git bazigb
cd bazigb
```

## مرحله ۲ — تنظیمات محیطی (.env)

```bash
cp .env.example .env
nano .env
```

مقادیر مورد نیاز:
| متغیر | توضیح | نمونه |
|---|---|---|
| `POSTGRES_PASSWORD` | رمز دیتابیس | یک رشته قوی |
| `JWT_SECRET` | کلید امضای توکن | `openssl rand -hex 32` |
| `DOMAIN` | دامنه عمومی (خالی = HTTP ساده با IP) | `bazigb.example.com` |
| `ALLOWED_ORIGINS` | خاستگاه‌های مجاز CORS | `https://bazigb.example.com` |

اگر دامنه دارید، ابتدا رکورد A آن را به IP سرور اشاره دهید.

## مرحله ۳ — اجرای دیپلوی

```bash
bash deploy.sh
```

اولین بیلد چند دقیقه طول می‌کشد (npm ci + کامپایل همه ورک‌اسپیس‌ها).

### دستورات کاربردی

| دستور | کار |
|---|---|
| `bash deploy.sh status` | وضعیت کانتینرها |
| `bash deploy.sh --logs` | دیپلوی + مشاهده لاگ |
| `bash deploy.sh down` | توقف کامل |
| `docker compose logs -f server` | لاگ سرور |
| `docker compose logs -f web` | لاگ وب |
| `docker compose exec db psql -U bazigb -d bazigb` | دسترسی به دیتابیس |

## مرحله ۴ — تأیید صحت

1. **وب:** در مرورگر `http://<IP-or-domain>` — صفحه لابی باید نمایش داده شود.
2. **API:** `curl http://localhost/api/rooms` باید `[]` برگرداند.
3. **بازی بلادرنگ:** دو تب مرورگر باز کنید، یک اتاق وگاس بسازید، از تب دوم با کد اتاق وارد شوید و یک بازی کامل انجام دهید.
4. **دیتابیس:** پس از یک بازی، `curl http://localhost/api/leaderboard` نباید خطا بدهد.

## به‌روزرسانی نسخه‌های بعدی

```bash
# روی سرور:
cd /opt/bazigb
git pull
bash deploy.sh
```

## عیب‌یابی

| مشکل | راه‌حل |
|---|---|
| سرور بالا نمی‌آید (Restarting) | `docker compose logs server` — معمولاً مشکل `DATABASE_URL` یا مایگریشن |
| خطای Prisma / جدول پیدا نشد | اولین بار `prisma migrate deploy` به‌صورت خودکار اجرا می‌شود؛ اگر اجرا نشد: `docker compose exec server npx prisma migrate deploy --schema apps/server/prisma/schema.prisma` |
| CORS خطا | `ALLOWED_ORIGINS` را در `.env` تنظیم کنید و `bash deploy.sh` دوباره بزنید (فقط server و caddy ری‌استارت می‌شوند) |
| وبSocket وصل نمی‌شود | بررسی `docker compose logs caddy` — مسیر `/socket.io/*` باید به server پروکسی شود |
| SSL فعال نشد | `DOMAIN` باید در `.env` باشد و رکورد DNS به IP سرور اشاره کند |

## امنیت

- [ ] فایل `.env` روی سرور فقط root/داخلی قابل خواندن باشد (`chmod 600 .env`)
- [ ] پورت‌های غیرضروری را در فایروال ببندید (فقط 22، 80، 443 باز باشد)
- [ ] `JWT_SECRET` واقعاً تصادفی باشد
- [ ] برای SSH از کلید (نه رمز) استفاده کنید
- [ ] آپدیت امنیتی سیستم: `sudo apt update && sudo apt upgrade` (دوره‌ای)
