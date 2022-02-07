import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';

import { maxResponsiveHeight } from '../../actions/variables';
import IcoWeather from '../IcoWeather/IcoWeather';
import Text from '../Text/Text';

interface Props {
    weather?: { icon: string } | undefined;
    title: String;
    temperature: Number,
    style?: object,
    index?: number,
}

const { width, height } = Dimensions.get('screen');

const ShortWeather: React.FC<Props> = ({ title, weather, temperature, style: styleParam = {}, index = 0 }) => {

    return (
        <View style={{...style.main, ...styleParam}}>
            <Text style={{...style.title, ...(index <=1 ? style.titleNear : {})}}>{title}</Text>
            <IcoWeather size={height <= maxResponsiveHeight ? 50 : 60} icon={weather.icon} />
            <Text style={style.temperature}>{`${temperature}°C`}</Text>
        </View>
    );
}
export default ShortWeather;

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 100,
        paddingTop: height <= maxResponsiveHeight ? 45 : 60,
        zIndex: 1,
    },
    title: {
        color: '#cfcfcf',
        fontSize: 12,
        marginBottom: 5
    },
    titleNear: {
        color: '#0f0',
    },
    temperature: {
        color: '#d8d8d8',
        marginBottom: 10,
    }
});