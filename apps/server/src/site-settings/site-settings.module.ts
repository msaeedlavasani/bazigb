import { Module } from '@nestjs/common';
import { SiteSettingsController } from './site-settings.controller';
import { AdminGuard } from '../common/admin.guard';

@Module({
  controllers: [SiteSettingsController],
  providers: [AdminGuard],
})
export class SiteSettingsModule {}
