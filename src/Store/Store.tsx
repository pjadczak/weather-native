import { combineReducers } from 'redux';
import { ADD_DATA_WAEATHER, SET_CURRENT, SET_CURRENT_NOW, SET_GPS_PERISSION, SET_LOCATION_NAME, SET_LANG, SET_POSITION, SET_FULL_STATE } from './types';
import { CurrentDataType } from './interfaces';

export const defaultCurrentData: CurrentDataType = {
    temperature: null,
    wind: null,
    cloudy: null,
    pressure: null,
    humidity: null,
    snow: null,
    snowdepth: null,
    feelslike: null,
    icon: null,
    hours: [],
    datetime: ''
}

const INITIAL_STATE_WEATHER = {
    weatherData: {
        days: [],
        currentConditions: {
            temp: null,
            windspeed: null,
            cloudcover: null,
            pressure: null,
            humidity: null,
            snow: null,
            snowdepth: null,
            feelslike: null,
            icon: null,
        }
    },
    actualIndexData: -1,// actual weather index data from currentConditions
    current: defaultCurrentData,
    gpsPermission: null,
    position: null,
    locationName: '',
    lang: 'en',
    dataType: 'gpx',
    actualCity: null,
    cities: []
};

const weatherReducer = (state = INITIAL_STATE_WEATHER, action: any) => {

    
    switch (action.type) {
        
        case ADD_DATA_WAEATHER:

            return {
                ...state,
                weatherData: action.payload.dataWeather,
                position: action.payload.position,
                dataType: action.payload.dataType,
                actualCity: action.payload.actualCity,
                current: action.payload.dayIndex === null ? {// if new data
                    ...state.current,
                    temperature: action.payload.dataWeather.currentConditions.temp,
                    wind: action.payload.dataWeather.currentConditions.windspeed,
                    cloudy: action.payload.dataWeather.currentConditions.cloudcover,
                    pressure: action.payload.dataWeather.currentConditions.pressure,
                    humidity: action.payload.dataWeather.currentConditions.humidity,
                    snow: action.payload.dataWeather.currentConditions.snow,
                    snowdepth: action.payload.dataWeather.currentConditions.snowdepth,
                    feelslike: action.payload.dataWeather.currentConditions.feelslike,
                    icon: action.payload.dataWeather.currentConditions.icon,
                } : {// if data reload to specific day
                    ...state.current,
                    temperature: action.payload.dataWeather.days[action.payload.dayIndex].temp,
                    wind: action.payload.dataWeather.days[action.payload.dayIndex].windspeed,
                    cloudy: action.payload.dataWeather.days[action.payload.dayIndex].cloudcover,
                    pressure: action.payload.dataWeather.days[action.payload.dayIndex].pressure,
                    humidity: action.payload.dataWeather.days[action.payload.dayIndex].humidity,
                    snow: action.payload.dataWeather.days[action.payload.dayIndex].snow,
                    snowdepth: action.payload.dataWeather.days[action.payload.dayIndex].snowdepth,
                    feelslike: action.payload.dataWeather.days[action.payload.dayIndex].feelslike,
                    icon: action.payload.dataWeather.days[action.payload.dayIndex].icon,
                    hours: action.payload.dataWeather.days[action.payload.dayIndex].hours,
                    datetime: action.payload.dataWeather.days[action.payload.dayIndex].datetime
                }
            };

        case SET_CURRENT: 

            return {
                ...state,
                actualIndexData: action.payload.dayIndex,
                current: {
                    temperature: state.weatherData.days[action.payload.dayIndex].temp,
                    wind: state.weatherData.days[action.payload.dayIndex].windspeed,
                    cloudy: state.weatherData.days[action.payload.dayIndex].cloudcover,
                    pressure: state.weatherData.days[action.payload.dayIndex].pressure,
                    humidity: state.weatherData.days[action.payload.dayIndex].humidity,
                    snow: state.weatherData.days[action.payload.dayIndex].snow,
                    snowdepth: state.weatherData.days[action.payload.dayIndex].snowdepth,
                    feelslike: state.weatherData.days[action.payload.dayIndex].feelslike,
                    icon: state.weatherData.days[action.payload.dayIndex].icon,
                    hours: state.weatherData.days[action.payload.dayIndex].hours,
                    datetime: state.weatherData.days[action.payload.dayIndex].datetime
                }
            }

        case SET_CURRENT_NOW:

            return {
                ...state,
                actualIndexData: -1,
                current: {
                    temperature: state.weatherData.currentConditions.temp,
                    wind: state.weatherData.currentConditions.windspeed,
                    cloudy: state.weatherData.currentConditions.cloudcover,
                    pressure: state.weatherData.currentConditions.pressure,
                    humidity: state.weatherData.currentConditions.humidity,
                    snow: state.weatherData.currentConditions.snow,
                    snowdepth: state.weatherData.currentConditions.snowdepth,
                    feelslike: state.weatherData.currentConditions.feelslike,
                    icon: state.weatherData.currentConditions.icon,
                    hours: []
                }
            };

        case SET_GPS_PERISSION:

            return {
                ...state,
                gpsPermission: action.payload
            }

        case SET_LOCATION_NAME:

            return {
                ...state,
                locationName: action.payload
            }

        case SET_LANG:

            return {
                ...state,
                lang: action.payload
            }

        case SET_POSITION:

            return {
                ...state,
                position: action.payload
            }

        case SET_FULL_STATE:

            return action.payload;

        default:
            return state
    }
};

export default combineReducers({
  weather: weatherReducer
});