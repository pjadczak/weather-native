export type CurrentDataType = {
    temperature: number;
    wind: number;
    cloudy: number;
    humidity: number;
    pressure: number;
    feelslike: number;
    hours: HourType[]
    icon: string,
    datetime: string,
    snow: string,
    snowdepth: string
}

export type HourType = {
    temp: number|null,
    datetime: string
}

export type DayType = {
    datetime: string,
    temp: number,
    hours: HourType[],
    icon: string,
    pressure: number,
    humidity: number,
    windspeed: number
}

export type WeatherType = {
    weatherData: {
        days: DayType[]
    };
    current: CurrentDataType,
    actualIndexData: number;
    gpsPermission: boolean | null,
    locationName: String,
    position: { 
        latitude: number, 
        longitude: number
    } | null,
    actualCity: { name: String, latitude: number, longitude: number, shortName: string },
    dataType: String,
    lang: string
}

export interface PropsWeather {
    weather: WeatherType
}

export type DataCityType = {
    boundingbox: String[],
    lat: number,
    lon: number,
    place_id: number,
    display_name: String
}