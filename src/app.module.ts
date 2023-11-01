import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PogodaModule } from './pogoda/pogoda.module';

@Module({
  imports: [ConfigModule.forRoot(), PogodaModule],
})
export class AppModule {}
