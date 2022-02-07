import axios from 'axios';
import Config from 'react-native-config';


interface CallbackType {
    (data: object): void;
}

export const readApiDataPosition = (latitude: number, longitude: number,callback : CallbackType): void => {
    
    const dataLocation = latitude+','+longitude;

    const url: string = __DEV__ && Config.WEATHER_DEV ? Config.WEATHER_DEV : 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/'+dataLocation+'?unitGroup=metric&contentType=json&key='+Config.VISUAL_CROSSING_WEATHER_API_KEY;

    axios.get(url)
        .then(result => {
            callback(result.data);
        })
        .catch(error => {
            console.log('error: ',error);
        });

}
