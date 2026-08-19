# معماری پروژه BaziGB

این سند معماری فنی پلتفرم **BaziGB** را تشریح می‌کند. برای قوانین بصری، [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md) را ببینید.

## نمای کلی

```
┌──────────────────────────────┐        ┌──────────────────────────────┐
│  apps/web (Next.js + MUI)    │        │  apps/server (NestJS)        │
│  - صفحات و کامپوننت‌های UI     │  REST  │  - Auth (JWT + OTP)          │
│  - پیش‌بینی وضعیت سمت کلاینت   │◄─────►│  - Rooms / Admin / Stats     │
│  - بازی با AI (سطح دشواری)    │ Socket │  - Game Gateway (Socket.io)  │
└──────────┬───────────────────┘ io     └──────────┬───────────────────┘
           │                                       │ Prisma
┌──────────▼───────────────────┐        ┌──────────▼───────────────────┐
│  packages/engine             │        │  PostgreSQL 16               │
│  - Turn/Dice/Phase Engine    │        │  - User / Room / GameHistory │
│  - createInitialState,       │        │  - Tournament / SiteSetting  │
│    processMove, applyAction  │        └──────────────────────────────┘
└──────────┬───────────────────┘
           │
┌──────────▼───────────────────┐
│  packages/games/*            │
│  - منطق خالص هر بازی          │
│  - ai.ts (سطوح دشواری)        │
└──────────────────────────────┘
```

## مدل هسته و پلاگین (Core/Plugin)

پروژه بر پایه یک هسته‌ی مرکزی (`packages/engine`) طراحی شده است:

- **مدیریت نوبت‌ها:** `processMove` (پایان خودکار نوبت) و `applyAction` (اکشن‌های چندمرحله‌ای بدون تعویض نوبت — تخته‌نرد/وگاس).
- **مدیریت وضعیت:** `GameState<G>` شامل `G` (وضعیت بازی) و `ctx` (بازیکن فعلی، تاس، فاز، بازیکنان).
- **تاس:** `rollDice(state, count)`.

هر بازی (`packages/games/<name>`) یک پکیج مستقل است که اینترفیس `Game` را پیاده‌سازی می‌کند:

```ts
export const Game: Game<G> = {
  name: 'backgammon',
  setup: (numPlayers) => ({ ... }),          // وضعیت اولیه
  moves: {
    makeMove: (G, ctx, ...args) => ({ ... }), // اعتبارسنجی + تغییر وضعیت
  },
};
```

بازی‌ها هیچ وابستگی به سرور یا کلاینت ندارند؛ منطق کاملاً ایزوله و قابل تست است. سرور فقط «حرکت را اعتبارسنجی و Broadcast می‌کند».

## هوش مصنوعی (VS Computer)

هر بازی می‌تواند ماژول `ai.ts` ارائه دهد:

- **دوز (`tic-tac-toe/src/ai.ts`):** `getBestMove(state, aiSymbol, difficulty)` — Easy (تصادفی) / Medium (تاکتیک ۱-پلی با ۲۰٪ خطا) / Hard (Minimax + آلفا-بتا).
- **تخته‌نرد (`backgammon/src/ai.ts`):** `getBestMoveSequence(state, playerId, ctx, dice, difficulty)` — Easy (تصادفی) / Medium (Heuristic ۱-پلی) / Hard (نگاه ۲-پلی با شبیه‌سازی پاسخ حریف).
- اتصال AI به اتاق از طریق رویداد سوکت `add_ai_player` انجام می‌شود.

## سرور (apps/server)

- **NestJS + Socket.io Gateway.** هر اتاق یک `roomCode` دارد؛ وضعیت در دیتابیس (`Room.gameState`) ذخیره می‌شود.
- **هویت سوکت با JWT:** هنگام handshake، توکن از `auth` خوانده و socket به `userId` گره می‌خورد (`socketUsers`/`socketUsernames`). بازپس‌گیری صندلی بازیکن قطع‌شده فقط با همان JWT یا `seatKey`.
- **اعتبارسنجی Zod:** تمام پیام‌های ورودی سوکت (`joinRoom`, `makeMove`, `gameAction`, `rollDice`, `chat`, `undo`, `nextRound`) با اسکیما در `src/socket-validation.ts` اعتبارسنجی می‌شوند؛ پیام نامعتبر → `emit('error')` بدون عارضه.
- **سیستم Undo:** استک اسنپ‌شات per-room (سقف ۵۰) قبل از هر `gameAction` (تخته‌نرد/وگاس)؛ فقط آخرین اکشن توسط همان بازیکن برگشت‌پذیر است.
- **تایمر نوبت:** ۱۲۰ ثانیه per-room؛ انقضا → `endTurn` خودکار برای تخته‌نرد/وگاس، هشدار برای شطرنج/دوز.
- **احراز هویت:** JWT + bcrypt؛ ورود با ایمیل/پسورد یا شماره موبایل + OTP (sms.ir)؛ `PATCH /auth/change-password`.
- **RBAC:** فیلد `role` (`USER`/`ADMIN`) در User + JWT؛ دکوراتور `@Roles` + `AdminGuard`؛ ماژول `Admin` (`/admin/stats`, `/admin/users`, `/admin/site-settings`).
- **ریت‌لیمیت:** `@nestjs/throttler` — سراسری ۲۰/دقیقه، `/auth/login` و `/auth/otp/request` سخت‌تر (۵/دقیقه)؛ `trust proxy` پشت Caddy.

## وب (apps/web)

- **Next.js + MUI (Material UI)** با تم اختصاصی در `ThemeRegistry.tsx` (پالت برند طبق DESIGN_SYSTEM.md).
- **اتو-لیوت:** `AppShell` — هدر (`Nav.tsx`) + `<main flex:1>` + فوتر (`Footer.tsx`، محتوای قابل ویرایش از `/admin`).
- **فوتر:** محتوای داینامیک از `GET /site-settings` (tagline + links + copyright) + نشان اینماد.
- **بازی‌ها:** کامپوننت‌های اختصاصی (`BackgammonBoard.tsx` با SVG/بافت/Framer Motion، `ChessBoard.tsx`، `Board.tsx`، `VegasBoard.tsx`).
- **پیش‌بینی سمت کلاینت:** استفاده از منطق پکیج‌های بازی برای نمایش وضعیت بدون لگ.

## جریان داده (Data Flow)

1. بازیکن در فرانت‌اند حرکتی انجام می‌دهد (کلیک/درگ).
2. حرکت از طریق Socket.io به سرور ارسال می‌شود (`makeMove` / `gameAction`).
3. سرور با Zod اعتبارسنجی می‌کند، نوبت را چک می‌کند و حرکت را روی منطق پکیج بازی اعمال می‌کند.
4. وضعیت جدید در دیتابیس ذخیره و به تمام بازیکنان اتاق Broadcast می‌شود (`gameState`).
5. اگر بازی تمام شود، امتیاز/ELO/تاریخچه به‌روزرسانی می‌شود (و در مسابقات Best-of-N، راند بعدی شروع می‌شود).
