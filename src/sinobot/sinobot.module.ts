import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './services/type-orm-config.service';

import { SinobotController } from './sinobot.controller';

import { SinobotService } from './sinobot.service';
import { PogodaService } from './services/pogoda.service';
import { OrderService } from './services/order.service';
import { Item } from './entity/item.entity';
import { OrderValid } from './validation/order.valid';
import { ScanData } from './entity/scanData.entity';



@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			useClass: TypeOrmConfigService
		}),
		TypeOrmModule.forFeature([ ScanData, Item ])
	],
	
  controllers: [SinobotController],
  providers: [SinobotService, PogodaService, OrderService, OrderValid],
})
export class SinobotModule {}