import axios from 'axios';

interface CallbackType {
    (data: object): void;
}

export const getCityByLocation = (latitude: number, longitude: number,callback : CallbackType): void => {
    
    const dataLocation = latitude+','+longitude;

    const url: string = __DEV__ ? 'https://h15.pl/weatherCity.json' : 'https://geocode.xyz/'+dataLocation+'?json=1';

    axios.get(url)
        .then(result => {
            callback?.(result.data?.city);
        })
        .catch(error => {
            console.log('error: ',error);
            callback?.(null);
        });

}
