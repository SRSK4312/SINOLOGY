import { Injectable } from '@nestjs/common';
import { PogodaService } from './services/pogoda.service';
import { commandSinoBot } from './dto/sinobot.dto';
import { OrderService } from './services/order.service';
import { env } from 'process';
import { OrderValid } from './validation/order.valid';


@Injectable()
export class SinobotService {

	constructor (
		private readonly pogodaService : PogodaService,
		private readonly orderService: OrderService,
		private readonly orderValid: OrderValid
	){}

	private defaultReturn = `:question: Для того чтобы узнать погоду напиши мне "погода" или в любом другом диалоге "/pogoda"
													:question: Для того что бы узнать статус заказа напиши мне его номер и я постараюсь тебе помочь.`


	createAnswer(request : commandSinoBot){
		// Проверка токена
		if (request.token != env.SINOBOT_API_KEY){
			if (request.token != env.COMMAND_POGODA_KEY) 
				return {text: 'Недействительный токен доступа'}
		}

		console.log(request);
		const reqTXT = request.text.toLowerCase().trim()

		// Приветствие
		if ( reqTXT === 'привет' || reqTXT === 'hello' || reqTXT === 'hi'){
			return {text: `Привет. :wave: Я твой небольшой помощник. :nerd:
							${this.defaultReturn}`}
		}

		// Погода 
		if ( reqTXT === 'погода' || reqTXT === 'pogoda' || reqTXT === '/pogoda' ){
			return this.pogodaService.createAnswer(request)
		} 

		// Заказы
		if (this.orderValid.validTaskNo(reqTXT) || this.orderValid.validOrderNo(reqTXT)){
			return this.orderService.getOrderInfo(reqTXT)
		}

		return {text : this.defaultReturn}
	}
}
