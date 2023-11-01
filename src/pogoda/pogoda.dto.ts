export class commandPogodaDto {
	token?: string;
	user_id?: string;
	username?: string;
	text: string;
	status?: null | number
}

export class returnPogodaDto {
	temperature: number;
	description: string;
	feels_like: number;
	humidity: number;
	wind_speed: number;
	sunrise: string;
	sunset: string;
}

export class openWeatherResponse{
  coord: { lon: number, lat: number };
  weather: [
    {
      id: number,
      main: string,
      description: string,
      icon: string
    }
  ];
  base: string;
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  };
  visibility: number;
  wind: { speed: number, deg: number, gust: number };
	rain: { "1h": number, "3h": number,};
	snow: { "1h": number, "3h": number,};
  clouds: { all: number };
  dt: number;
  sys: {
    type: number,
    id: number,
    country: string,
    sunrise: number,
    sunset: number,
  };
  timezone: number;
  id: number;
  name: string;
  cod: number
	err: string
}


/*
	- coord
			coord.lon Долгота местоположения
			coord.lat Широта местоположения
	+ weather 
			weather.id Погодные условия id
			+ weather.main Группа погодных параметров (Дождь, снег, облака и т. д.)
			+ weather.description Погодные условия внутри группы. Пожалуйста, найдите больше здесь. Вы можете получить результат на своем языке.
			weather.icon Weather icon id
	base Внутренний параметр
	+ main
			+ main.temp Температура.
			+ main.feels_like Температура. Этот температурный параметр отвечает за восприятие человеком погоды.
			+ main.pressure Атмосферное давление на уровне моря, hPa
			+ main.humidity Влажность, %
			main.temp_min Минимальная температура на данный момент. Это минимальная наблюдаемая в настоящее время температура. 
			main.temp_max Максимальная температура на данный момент. Это максимальная наблюдаемая в настоящее время температура.
			main.sea_level Атмосферное давление на уровне моря, hPa
			main.grnd_level Атмосферное давление на уровне земли, hPa
	- visibility Видимость, метр. Максимальное значение видимости 10 км.
	+ wind
			+ wind.speed Скорость ветра. 
			? wind.deg Направление ветра, градусы (метеорологические)
			wind.gust Порыв ветра. Unit Default: meter/sec, Metric: meter/sec, Imperial: miles/hour
	- clouds
			clouds.all Облачность, %
	- rain
			rain.1h (where available) Rain volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
			rain.3h (where available) Rain volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter
	- snow
			snow.1h(where available) Snow volume for the last 1 hour, mm. Please note that only mm as units of measurement are available for this parameter
			snow.3h (where available)Snow volume for the last 3 hours, mm. Please note that only mm as units of measurement are available for this parameter
	dt Время расчета данных, UTC
	+ sys
			 sys.type Внутренний параметр
			 sys.id Внутренний параметр
			 sys.message Внутренний параметр
			 sys.country Код страны (GB, JP etc.)
			+ sys.sunrise Время восхода солнца, UTC
			+ sys.sunset Время заката, UTC
	timezone Сдвиг в секундах от UTC
	id ID города. 
	name Название города.
	cod Внутренний параметр
*/