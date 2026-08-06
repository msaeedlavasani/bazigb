# راهنمای افزودن بازی جدید به BaziGB

برای اضافه کردن یک بازی جدید (مثلاً منچ)، این مراحل را دنبال کنید:

## ۱. ایجاد پکیج بازی
یک پوشه جدید در `packages/games/your-game` بسازید و فایل `package.json` آن را تنظیم کنید:
```json
{
  "name": "@bazigb/game-your-game",
  "version": "1.0.0",
  "dependencies": {
    "@bazigb/engine": "*"
  }
}
```

## ۲. پیاده‌سازی منطق بازی
یک فایل در `src/index.ts` ایجاد کنید و از اینترفیس `Game` استفاده کنید:

```typescript
import { Game } from '@bazigb/engine';

export const YourGame: Game = {
  name: 'your-game',
  setup: () => ({
    // وضعیت اولیه
  }),
  moves: {
    makeMove: (G, ctx, arg) => {
      // تغییر وضعیت G
      return { ...G };
    }
  },
  endIf: (G, ctx) => {
    // چک کردن پایان بازی
  }
};
```

## ۳. ثبت در اپلیکیشن وب
پکیج جدید را به `apps/web/package.json` اضافه کنید و در صفحه بازی‌ها، کامپوننت مربوط به آن را رندر کنید.

## ۴. ثبت در سرور
در صورت نیاز به منطق خاص در سمت سرور، آن را در `apps/server` وارد کنید. در اکثر مواقع، سرور به صورت خودکار با استفاده از منطق انجین، حرکت‌ها را مدیریت می‌کند.
