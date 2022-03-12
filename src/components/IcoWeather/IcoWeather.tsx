import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { View, StyleSheet, Image } from 'react-native';
import { isEqual } from 'lodash';
import React from 'react';

const ImgClearDay = require('../../../assets/images/icons/clear-day.png');
const ImgClearNight = require('../../../assets/images/icons/clear-night.png');
const ImgCloudy = require('../../../assets/images/icons/cloudy.png');
const ImgFog = require('../../../assets/images/icons/fog.png');
const ImgHail = require('../../../assets/images/icons/hail.png');
const ImgPartlyCloudyDay = require('../../../assets/images/icons/partly-cloudy-day.png');
const ImgPartlyCloudyNight = require('../../../assets/images/icons/partly-cloudy-night.png');
const ImgRain = require('../../../assets/images/icons/rain.png');
const ImgRainSnow = require('../../../assets/images/icons/rain-snow.png');
const ImgRainSnowShowersDay = require('../../../assets/images/icons/rain-snow-showers-day.png');
const ImgRainSnowShowersNight = require('../../../assets/images/icons/rain-snow-showers-night.png');
const ImgShowersDay = require('../../../assets/images/icons/showers-day.png');
const ImgShowersNight = require('../../../assets/images/icons/showers-night.png');
const ImgSleet = require('../../../assets/images/icons/sleet.png');
const ImgSnow = require('../../../assets/images/icons/snow.png');
const ImgSnowShowersDay = require('../../../assets/images/icons/snow-showers-day.png');
const ImgSnowShowersNight = require('../../../assets/images/icons/snow-showers-night.png');
const ImgThunder = require('../../../assets/images/icons/thunder.png');
const ImgThunderRain = require('../../../assets/images/icons/thunder-rain.png');
const ImgThunderShowersDay = require('../../../assets/images/icons/thunder-showers-day.png');
const ImgThunderShowersNight = require('../../../assets/images/icons/thunder-showers-night.png');
const ImgWind = require('../../../assets/images/icons/wind.png');

interface Props {
    icon: string;
    size: number;
}

const IcoWeather: React.FC<Props> = ({ icon, size }) => {


    const chooseIco = () => {

        if (icon === 'clear-night') return ImgClearNight;
        if (icon === 'cloudy') return ImgCloudy;
        if (icon === 'fog') return ImgFog;
        if (icon === 'hail') return ImgHail;
        if (icon === 'partly-cloudy-day') return ImgPartlyCloudyDay;
        if (icon === 'partly-cloudy-night') return ImgPartlyCloudyNight;
        if (icon === 'rain') return ImgRain;
        if (icon === 'rain-snow') return ImgRainSnow;
        if (icon === 'rain-snow-showers-day') return ImgRainSnowShowersDay;
        if (icon === 'rain-snow-showers-night') return ImgRainSnowShowersNight;
        if (icon === 'showers-day') return ImgShowersDay;
        if (icon === 'showers-night') return ImgShowersNight;
        if (icon === 'sleet') return ImgSleet;
        if (icon === 'snow') return ImgSnow;
        if (icon === 'snow-showers-day') return ImgSnowShowersDay;
        if (icon === 'snow-showers-night') return ImgSnowShowersNight;
        if (icon === 'thunder') return ImgThunder;
        if (icon === 'thunder-rain') return ImgThunderRain;
        if (icon === 'thunder-showers-day') return ImgThunderShowersDay;
        if (icon === 'thunder-showers-night') return ImgThunderShowersNight;
        if (icon === 'wind') return ImgWind;
        
        return ImgClearDay;
    }

    return (
        <View style={style.main}>
            <Image 
                style={{ width: size, height: size }}
                source={chooseIco()}
            />
        </View>
    );
}
export default React.memo(IcoWeather, isEqual);

const style = StyleSheet.create({
    main: {
    }
});