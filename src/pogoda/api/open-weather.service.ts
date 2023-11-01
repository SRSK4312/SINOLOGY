import axios from 'axios';
import { env } from 'process';


export class OpenWeatherService {
	private $api = axios.create({
		withCredentials: true,
		baseURL: env.WEATHER_API_URL
	})

	async getWeather (){
		return (await this.$api.post( `&appid=${env.WEATHER_API_KEY}&lang=ru&units=metric&q=Кирово-Чепецк`)).data
	}
}
