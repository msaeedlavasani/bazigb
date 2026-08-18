# راهنمای افزودن بازی جدید به BaziGB (Game SDK)

این مستند قدم‌به‌قدم نشان می‌دهد چگونه یک بازی جدید (مثلاً منچ یا ماروپله) را به پلتفرم اضافه کنید — با منطق خالص، رابط کاربری، و (اختیاری) هوش مصنوعی.

## پیش‌نیاز

- معماری Engine/Plugin را در [ARCHITECTURE.md](ARCHITECTURE.md) بخوانید.
- قوانین بصری الزامی است: [DESIGN_SYSTEM.md](../DESIGN_SYSTEM.md).

## ۱. ایجاد پکیج بازی

```bash
mkdir -p packages/games/your-game/src
```

`packages/games/your-game/package.json`:

```json
{
  "name": "@bazigb/game-your-game",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "dependencies": {
    "@bazigb/engine": "*"
  },
  "scripts": {
    "build": "tsc -p tsconfig.build.json"
  }
}
```

> ساختار `tsconfig.json` / `tsconfig.build.json` را از یک پکیج موجود (مثل `tic-tac-toe`) کپی کنید.

## ۲. پیاده‌سازی منطق بازی

فایل `src/index.ts` — اینترفیس `Game` از `@bazigb/engine`:

```typescript
import { Game } from '@bazigb/engine';

export const YourGame: Game<YourState> = {
  name: 'your-game',

  // وضعیت اولیه — `numPlayers` تعداد بازیکنان اتاق است
  setup: (numPlayers) => ({
    board: [],
    turn: 0,
    // ...
  }),

  // همه‌ی حرکت‌ها — هر حرکت G و ctx را می‌گیرد و G جدید برمی‌گرداند
  moves: {
    makeMove: (G, ctx, from: number, to: number) => {
      // ۱) اعتبارسنجی
      // ۲) تغییر وضعیت (کپی‌ایمن — immutable)
      return { ...G, board: [...G.board] };
    },
    pass: (G) => G,
  },
};
```

### قوانین نوبت

- **هر حرکت به‌صورت پیش‌فرض نوبت را عوض می‌کند** (`processMove`).
- اگر بازی نیاز به چند اکشن در یک نوبت دارد (مثل تخته‌نرد)، سرور از `applyAction(game, state, move, player, endTurn, ...args)` استفاده می‌کند و `endTurn` را فقط در اکشن آخر `true` می‌گذارد.

## ۳. هوش مصنوعی (اختیاری)

فایل `src/ai.ts` بسازید و از `src/index.ts` اکسپورت کنید:

```typescript
export type Difficulty = 'easy' | 'medium' | 'hard';

// وضعیت فعلی + تاس/اطلاعات نوبت را می‌گیرد و بهترین حرکت را برمی‌گرداند
export function getBestMove(state, difficulty: Difficulty = 'medium') {
  // easy:    انتخاب تصادفی از بین حرکت‌های مجاز
  // medium:  انتخاب هوشمندانه با خطاهای عمدی (قابل‌شکست‌دادن)
  // hard:    جستجوی کامل (Minimax / نگاه به جلو)
}
```

مثال‌های واقعی: `packages/games/tic-tac-toe/src/ai.ts` (Minimax + alpha-beta) و `packages/games/backgammon/src/ai.ts` (Heuristic + نگاه ۲-پلی).

## ۴. ثبت بازی در سرور

- بازی را به لیست بازی‌های قابل انتخاب در `apps/server` اضافه کنید (نگاه کنید به نحوه‌ی ثبت `tic-tac-toe` در gateway/rooms).
- اگر بازی نیاز به منطق خاص سرور دارد (مثل `nextRound` وگاس)، هندلرهای جدید را در `apps/server/src/game/game.gateway.ts` اضافه کنید و اسکیمای Zod متناظر را در `src/socket-validation.ts` ثبت کنید.

## ۵. رابط کاربری (UI)

کامپونتنی در `apps/web/src/app/components/` بسازید (مثلاً `YourGameBoard.tsx`) که:

- با **کامپوننت‌های MUI** و **توکن‌های تم** ساخته شود (هرگز HTML خام با استایل اینلاین).
- از **Tabletop View** استفاده کند (کل وضعیت در یک نگاه؛ نه فرم/لیست عمودی).
- ریسپانسیو باشد (۳۶۰px+ بدون overflow افقی).
- وضعیت‌های loading/empty/خطا و `aria-label` مناسب داشته باشد.

سپس در `apps/web/src/app/game/[roomId]/page.tsx` بر اساس `gameType` رندر شود.

## ۶. ثبت در لابی و متادیتا

- `GAME_OPTIONS` و `GAME_META` را در `apps/web/src/app/lobby/page.tsx` به‌روزرسانی کنید.
- آیکون بازی را به `GameIcon` اضافه کنید.

## ۷. بیلد و تست

```bash
npm run build --workspace=@bazigb/game-your-game   # بیلد پکیج
npm run build                                      # بیلد کل مونورپو (ترتیبی)
```

- `tsc --noEmit` باید تمیز باشد.
- منطق بازی را با اسکریپت Node مستقل از UI تست کنید.
- ظاهر را با مرورگر در 360/768/1440 وریفای کنید (Elite Audit).

## چک‌لیست نهایی

- [ ] منطق خالص در `packages/games/your-game` (بدون وابستگی به سرور/کلاینت)
- [ ] `ai.ts` (در صورت نیاز) با سطوح دشواری و اکسپورت از `index.ts`
- [ ] UI با MUI + توکن‌های تم + ریسپانسیو
- [ ] ثبت در لابی + صفحه بازی + متادیتا
- [ ] بیلد کل مونورپو سبز
