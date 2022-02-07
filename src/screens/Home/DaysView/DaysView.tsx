import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';

import { getDayName, calcPercentageRange } from '../../../actions/helper';
import IcoWeather from '../../../components/IcoWeather/IcoWeather';
import { DayType } from '../../../Store/interfaces';
import Text from '../../../components/Text/Text';

const { width, height } = Dimensions.get('screen');

type PropsType = {
    daysData: DayType[],
    lang: string,
    getWord: (langCode: string, word: string, data?: []) => string,
    setCurrent: (index: number, data: DayType) => void,
    currentDatatime: string
}

const DaysView: React.FC<PropsType> = ({ daysData, lang, getWord, setCurrent, currentDatatime }) => {

    const _ = getWord;
    const [minMax, setMinMax] = useState({ min: 0, max: 0 });

    useEffect(() => {
        const minData = [...daysData.sort((a,b) => a.temp - b.temp)];
        const maxData = [...daysData.sort((a,b) => b.temp - a.temp)];
        // console.log('min/max: ',minData[0].temp,maxData[0].temp,(maxData[0].temp+Math.abs(minData[0].temp)));
        setMinMax({ min: minData[0].temp, max: maxData[0].temp});
    },[daysData]);

    // console.log('minMax: ',minMax);

    return (
        <View style={style.main}>
            <ScrollView>
                {daysData.map((dayData: DayType, index: number): React.ReactNode => {
                    const dayName = getDayName(index);
                    return (
                        <TouchableOpacity style={{...style.dataLayer, ...(currentDatatime === dayData.datetime ? style.dataLayerSelected : {})}} key={`date_${dayData.datetime}`} onPress={() => setCurrent(index, dayData)}>
                            <IcoWeather size={70} icon={dayData.icon} />
                            <View style={style.body}>
                                <Text style={{...style.textDayName, ...(index <2 ? style.textDayNameNear : {})}}>{_(lang,dayName[0])}{dayName[1] ? dayName[1] : ''}</Text>
                                <Text style={{...style.textTemperature, ...(dayData.temp < 0 ? style.textTemperatureBelow : {})}}>{dayData.temp}°C</Text>
                                <Text style={style.textPressure}>{_(lang,'Ciśnienie')}: <Text style={{...style.textPressure, ...style.textPressureValue}}>{dayData.pressure}</Text> hPa</Text>
                                <Text style={style.textPressure}>{_(lang,'Wilgotność')}: <Text style={{...style.textPressure, ...style.textPressureValue}}>{dayData.humidity}</Text> %</Text>
                                <Text style={style.textPressure}>{_(lang,'Wiatr')}: <Text style={{...style.textPressure, ...style.textPressureValue}}>{dayData.windspeed}</Text> {_(lang,'km/h')}</Text>
                                <View style={style.minMaxLayer}><View style={{...style.minMaxValue, height: (calcPercentageRange(dayData.temp, minMax.min, minMax.max)+'%')}}></View></View>
                            </View>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    );
}
export default DaysView;

const style = StyleSheet.create({
    main: {
        flex: 1,
        width,
    },
    dataLayer: {
        marginBottom: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: '#2a417449',
        borderRadius: 10,
    },
    dataLayerSelected: {
        borderColor: '#000',
        backgroundColor: '#6884c248',
    },
    body: {
        marginLeft: 20,
        flex: 1,
    },
    textDayName: {
        color: '#b8b8b8',
        fontSize: 12,
    },
    textDayNameNear: {
        color: '#3faa3f'
    },
    textTemperature: {
        fontSize: 22,
        lineHeight: 22,
        color: '#fff',
        marginTop: 10,
        marginBottom: 10,
    },
    textTemperatureBelow: {
        color: '#f00'
    },
    textPressure: {
        fontSize: 14,
        lineHeight: 14,
        color: '#a0a0a0',
        marginBottom: 5,
    },
    textPressureValue: {
        color: '#fff'
    },
    minMaxLayer: {
        position: 'absolute',
        bottom: 5,
        right: 0,
        width: 5,
        height: 105,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    minMaxValue: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: 5,
        height: 10,
        backgroundColor: '#4674aa'
    }
});