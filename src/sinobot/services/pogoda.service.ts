import { Injectable } from '@nestjs/common';

import { env } from 'process';
import { openWeatherResponse, returnPogodaDto } from '../dto/pogoda.dto';
import { commandSinoBot } from '../dto/sinobot.dto';

@Injectable()
export class PogodaService {

	private openWeatherData = new openWeatherResponse;

	private returnData = new returnPogodaDto

	private async fetchOpenWeather(){
		console.log("fetchOpenWeather - START")
		try {
			await fetch (env.WEATHER_API_FULLURL).then(res => res.json()).then((obj) => {
				this.openWeatherData = obj as openWeatherResponse
			})
		} catch (error) {
			if (error.message){
				throw this.openWeatherData.err = error.message
			} else {
				throw this.openWeatherData.err = "Error: Unknown error fetch OpenWeather"
			} 
		}finally{
			console.log("fetchOpenWeather - END")
		}
	}
	

	private validOpenWeather(){
		if (this.openWeatherData.err) return {text: `${this.openWeatherData.err}`}

		this.returnData.temperature = Math.round(this.openWeatherData.main.temp)
		this.returnData.feels_like = Math.round(this.openWeatherData.main.feels_like)
		this.returnData.humidity = this.openWeatherData.main.humidity
		this.returnData.wind_speed = this.openWeatherData.wind.speed
		this.returnData.description = this.openWeatherData.weather[0].description.charAt(0).toUpperCase() + this.openWeatherData.weather[0].description.slice(1)
		this.returnData.description[0].toLocaleUpperCase()
		this.returnData.sunset = new Date (this.openWeatherData.sys.sunset * 1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})
		this.returnData.sunrise = new Date (this.openWeatherData.sys.sunrise * 1000).toLocaleString('ru', {hour: 'numeric', minute: 'numeric'})
	}


	async createAnswer(request: commandSinoBot) {

		if (this.openWeatherData.dt){
			const now = new Date().getTime() / 1000
			const deltaTime = (now - this.openWeatherData.dt)/ 60 
// ----------- УСЛОВИЕ НА ОБНОВЛЕНИЕ КАЖДЫЕ 15 МИНУТ ----
			if (deltaTime >= 15){await this.fetchOpenWeather()}
// ------------------------------------------------------
		} else {
			console.log("fetch new Data")
			await this.fetchOpenWeather()
		}
		if (this.openWeatherData.err) return {text: `${this.openWeatherData.err}`}
		this.validOpenWeather()


		return {
			text: `Сегодня ${new Date().toLocaleString('ru', {year: 'numeric',	month: 'long',day: 'numeric'})} в Кирово-Чепецке\nТемпература: ${this.returnData.temperature} °С, ощущается как: ${this.returnData.feels_like} °С\n  Погодные условия: ${this.returnData.description}\n  Скорость ветра: ${this.returnData.wind_speed} м/c\n  Влажность: ${this.returnData.humidity} %\n  Восход: ${this.returnData.sunrise}  Закат: ${this.returnData.sunset}`
		}
  }
}
