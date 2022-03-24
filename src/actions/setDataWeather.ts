import { readApiDataPosition } from '../actions/readApiData';
import { getLocationByCity } from "./getLocationByCity";
import { DataCityType } from "../Store/interfaces";

type PositionType = {
    latitude: number,
    longitude: number
}

type AddDataType = (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number|null) => void;
type CallBackType = (result: number) => void;

export const setDataWeather = (getByCity: boolean, city: String, position: PositionType, actualCity: object|null, addData: AddDataType, callBack: CallBackType, dayIndex = null): void => {
    if(getByCity){
        getLocationByCity(city, (cityData: DataCityType|null): void => {
            if (cityData){
                readApiDataPosition(cityData.lat, cityData.lon,result => {
                    addData({ 
                            latitude: position ? position.latitude : cityData.lat, 
                            longitude: position ? position.longitude : cityData.lon,
                        }, 
                        { name: cityData.display_name, latitude: cityData.lat, longitude: cityData.lon, shortName: city }, 
                        'city',
                        result,
                        dayIndex
                    );
                    callBack(1);
                });
            } else {
                callBack(0);
            }
        });
    } else if (position?.latitude && position?.longitude){
        // get weather data by lat/lon
        readApiDataPosition(position.latitude, position.longitude,result => {
            addData({ 
                    latitude: position.latitude, 
                    longitude: position.longitude,
                }, 
                actualCity, 
                'gpx',
                result,
                dayIndex
            );
            callBack(2);
        });
    }
}