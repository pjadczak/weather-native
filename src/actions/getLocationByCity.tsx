import axios, { AxiosResponse } from 'axios';
import Config from 'react-native-config';

import { DataCityType } from '../Store/interfaces';

interface CallbackType {
    (data: DataCityType|null): void;
}

export const getLocationByCity = (city: String,callback : CallbackType): void => {
    
    const url: string = 'https://us1.locationiq.com/v1/search.php?key='+Config.LOCATION_IQ_KEY+'&q='+city+'&format=json';

    axios.get(url)
        .then((result: AxiosResponse): void => {
            if (result.data.length > 0 ) callback?.(result.data[0]);
            else callback?.(null);
        })
        .catch(error => {
            callback?.(null);
            console.log('error: ',error);
        });

}
