import GetLocation from 'react-native-get-location';

interface CallbackType {
    (data: object): void;
}

export const getLocation = (actionResult: CallbackType): void => {
    GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
    })
    .then(location => {
        actionResult({ latitude: location.latitude, longitude: location.longitude });
    })
    .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
    })
}