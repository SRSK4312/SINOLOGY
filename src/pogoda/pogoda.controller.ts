import { Controller, Post, Body } from '@nestjs/common';
import { PogodaService } from './pogoda.service';
import { commandPogodaDto, openWeatherResponse } from './pogoda.dto';

@Controller('pogoda')
export class PogodaController {
  constructor(private readonly pogodaService: PogodaService) {}
	public openWeatherData = new openWeatherResponse;
	@Post()
 		wbotAsk(@Body() request: commandPogodaDto) {
		return this.pogodaService.createAnswer(request)
  }	

}
