import { Platform } from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';

const checkPermition = (callback: any): void => {
    let permsRequire = null;
    if (Platform.OS === 'android'){
        permsRequire = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
    } else if (Platform.OS === 'ios'){
        permsRequire = PERMISSIONS.IOS.LOCATION_ALWAYS;
    }

    request(permsRequire).then((status) => {
        if (status === 'granted'){
            callback?.(true)
        } else if (status === 'blocked'){
            callback?.(false)
        } else {
            callback?.(null)
        }
    });
}

export default checkPermition;