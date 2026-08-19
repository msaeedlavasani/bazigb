# BaziGB — پلتفرم بازی‌های رومیزی آنلاین

**BaziGB** یک پلتفرم مدرن، ماژولار و دیتابیس‌محور برای بازی‌های رومیزی آنلاین است؛ با هویت بصری اختصاصی، موتور بازی انعطاف‌پذیر و تجربه‌ی زنده (Real-time) مبتنی بر Socket.io.

> **زنده در:** [https://bazigb.ir](https://bazigb.ir) — نسخه‌ی پروداکشن روی VPS + Docker + Caddy + PostgreSQL.

## وضعیت پروژه

- **۴ بازی فعال:** دوز (Tic-Tac-Toe)، شطرنج (Chess)، تخته‌نرد (Backgammon) و وگاس (Vegas).
- **هوش مصنوعی (VS Computer):** بازی با کامپیوتر با سطوح دشواری (Easy / Medium / Hard) — دوز و تخته‌نرد کامل، شطرنج/وگاس در دست توسعه.
- **احراز هویت کامل:** ورود با ایمیل/موبایل + کد OTP پیامکی (sms.ir)، JWT، تغییر رمز.
- **پنل ادمین:** RBAC، آمار عمیق، مدیریت کاربران (ریست آمار / غیرفعال‌سازی / حذف کامل / ویرایش).
- **هویت بصری:** مطابق [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) — تم اختصاصی MUI با پالت Honey Bronze / Prussian Blue، فونت Vazirmatn، بدون گرادیان.
- **نماد اعتماد:** اینماد در فوتر سایت فعال است.

## قابلیت‌های کلیدی

- **موتور بازی اختصاصی (`packages/engine`):** مدیریت نوبت، تاس، فاز و اکشن‌های چندمرحله‌ای (`applyAction`).
- **معماری پلاگین‌محور (`packages/games`):** هر بازی یک پکیج مستقل است (منطق خالص، بدون وابستگی به سرور/کلاینت) — [راهنمای افزودن بازی](docs/GAME_SDK.md).
- **ارتباط زنده:** Socket.io با هویت JWT، اعتبارسنجی Zod پیام‌ها، تایمر نوبت ۱۲۰ ثانیه، سیستم Undo (تخته‌نرد/وگاس).
- **هوش مصنوعی درون پکیج بازی:** هر بازی می‌تواند ماژول `ai.ts` با سطوح دشواری ارائه دهد.
- **پایداری:** PostgreSQL + Prisma (کاربران، اتاق‌ها، تاریخچه، تورنمنت‌ها، تنظیمات سایت).
- **امکانات رقابتی:** رتبه‌بندی ELO، لیدربورد، تورنمنت حذفی، مسابقات «Best of 3/5».
- **زیرساخت صوتی:** افکت‌های صوتی بازی با کنترل قطع/وصل از هدر.

## ساختار پروژه (Monorepo)

| مسیر | نقش |
|---|---|
| `apps/web` | رابط کاربری — Next.js + MUI (Material UI) + Framer Motion |
| `apps/server` | بک‌اند — NestJS + Prisma + Socket.io Gateway |
| `packages/engine` | هسته‌ی منطق بازی‌ها (Turn/Phase/Dice Engine) |
| `packages/games/tic-tac-toe` | بازی دوز (+ AI با Minimax و ۳ سطح دشواری) |
| `packages/games/chess` | بازی شطرنج |
| `packages/games/backgammon` | تخته‌نرد (+ AI با Heuristic و ۳ سطح دشواری) |
| `packages/games/vegas` | بازی وگاس (کارت‌های پول، ۴ راند، قانون ۸ تاس) |

## مستندات

| سند | محتوا |
|---|---|
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | **قانون اساسی طراحی و معماری UI** — برای هر توسعه‌دهنده/ایجنت الزامی است |
| [docs/HANDOFF.md](docs/HANDOFF.md) | آخرین وضعیت بچ‌ها، تصمیمات و پروتکل عملیاتی (نقطه شروع هر جلسه) |
| [docs/ROADMAP.md](docs/ROADMAP.md) | نقشه راه فازها و وضعیت تکمیل |
| [docs/ISSUES.md](docs/ISSUES.md) | بدهی‌های فنی، باگ‌ها و پیشنهادات بهبود |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | معماری فنی: Engine/Plugin، جریان داده، سرور و وب |
| [docs/GAME_SDK.md](docs/GAME_SDK.md) | آموزش قدم‌به‌قدم افزودن بازی جدید (+ AI) |
| [DEPLOY.md](DEPLOY.md) | راهنمای استقرار و دیپلوی پروداکشن (rsync + Docker) |

## اجرای محلی

```bash
# ۱. نصب وابستگی‌ها (ریشه‌ی مونورپو)
npm install

# ۲. تنظیم دیتابیس — Postgres لوکال (اسکیما به SQLite وابسته نیست)
#    متغیرهای apps/server/.env را با DATABASE_URL معتبر تنظیم کنید، سپس:
npx prisma generate --schema apps/server/prisma/schema.prisma
npx prisma migrate deploy --schema apps/server/prisma/schema.prisma

# ۳. اجرای توسعه
npm run dev:web      # فرانت‌اند (Next.js)
npm run dev:server   # سرور (NestJS)
```

> ⚠️ **بیلد مونورپو:** از `npm run build` در ریشه استفاده کنید (ترتیبی: engine → games → server → web). از `--workspaces` استفاده نکنید (موازی است و وابستگی‌ها ساخته‌نشده می‌مانند).

## پروتکل توسعه

قبل از شروع هر بچ، [پروتکل عملیاتی](docs/HANDOFF.md#پروتکل-عملیاتی-bazigb-نسخه-ارتقایافته) را بخوانید: بچ‌بندی ۵تایی، تفویض به ساب‌ایجنت، گزارش استاندارد، هرم اعتبارسنجی (Static → Elite Audit → Contract) و دیپلوی با `rsync`.

## هدف نهایی

اکوسیستمی که هر توسعه‌دهنده‌ای بتواند بازی رومیزی خود را به سادگی به پلتفرم اضافه کرده و از چندنفره، رنکینگ، چت، هوش مصنوعی و هویت بصری برند بهره‌مند شود.
