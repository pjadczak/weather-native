import { View, StyleSheet, Dimensions, Text } from 'react-native';
import React , { useEffect, useState } from 'react';
import { LineChart } from "react-native-chart-kit";

import { HourType } from '../../../Store/interfaces';

type ParamsType = {
    hourData: HourType[]
}

const width = Dimensions.get('screen').width;

const TemperatureDayChart: React.FC<ParamsType> = ({ hourData }) => {

    const [dataValues,setDataValues] = useState([]);
    const [dataLabels,setDataLabels] = useState([]);

    useEffect(() => {
        const _data = [];
        const _dataLabels = [];

        let isFullLabel = true;
        hourData.forEach((data: HourType, index: number):void => {
            if (index % 2){
                _data.push(data.temp);
                isFullLabel = !isFullLabel;
                if (isFullLabel){
                    _dataLabels.push(data.datetime.substr(0,5));
                } else {
                    _dataLabels.push('');
                }
            }
        })

        setDataValues(_data);
        setDataLabels(_dataLabels);
    },[hourData]);

    return (
        <View style={style.main}>
            <LineChart
                data={{
                    labels: dataLabels,
                    datasets: [
                        {
                            data: dataValues
                        }
                    ]
                }}
                withHorizontalLabels={false}
                withVerticalLabels={true}
                withHorizontalLines={true}
                withVerticalLines={false}
                xLabelsOffset={1}
                transparent
                withShadow={false}
                width={width - 20} // from react-native
                height={100}
                fromZero={false}
                renderDotContent={({x, y, index, indexData}): React.ReactNode => {
                    if (((index+1) % 3) || index === 0 || indexData === null) return;
                    return (
                        <View 
                            key={`index_temp_${index}`} 
                            style={{ ...style.chartDot,position: 'absolute', top: y, left: x,}}>
                                <Text style={style.chartDotText}>{indexData}°C</Text>
                        </View>
                    )
                }}
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: 3,
                        strokeWidth: 1,
                    }
                }}
                bezier
                style={style.lineChart}
            />
        </View>
    );
}
export default TemperatureDayChart;

const style = StyleSheet.create({
    main: {
        
    },
    lineChart: {
        paddingBottom: 10,
        paddingTop: 10,
        paddingLeft: 0,
        paddingRight: 0,
        marginBottom: 20,
        marginLeft: 10,
    },
    chartDot: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: 5,
        paddingHorizontal: 3,
        paddingVertical: 2,
    },
    chartDotText: {
        fontSize: 10,
        color: '#fff'
    }
});