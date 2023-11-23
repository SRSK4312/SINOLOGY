import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { SinobotModule } from './sinobot/sinobot.module';

@Module({
  imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		SinobotModule
	],
})
export class AppModule {}
