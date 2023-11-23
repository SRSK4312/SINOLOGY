import { Body, Controller, Post } from '@nestjs/common';
import { SinobotService } from './sinobot.service';


@Controller('sinobot')
export class SinobotController {
  constructor(private readonly sinobotService: SinobotService) {}

		@Post()
			getAsk(@Body() request) {
			return this.sinobotService.createAnswer(request)
 	 }
}
