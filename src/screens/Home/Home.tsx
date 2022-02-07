import { View, StyleSheet, SafeAreaView, ScrollView, TouchableHighlight, Dimensions, RefreshControl, Alert, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import React , { useState, useEffect, useRef } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { LineChart } from "react-native-chart-kit";
import { bindActionCreators } from 'redux';
import Swiper from 'react-native-swiper';
import { connect } from 'react-redux';
import { MotiView } from 'moti';

import { fontBold, backgroundColors, maxResponsiveHeight } from '../../actions/variables';
import { CurrentDataType, DayType, PropsWeather, HourType } from '../../Store/interfaces';
import { addData, setDataCurrent, setDataCurrentNow } from '../../Store/actions';
import TemperatureDayChart from './TemperatureDayChart/TemperatureDayChart';
import ShortWeather from '../../components/ShortWeather/ShortWeather';
import IcoWeather from '../../components/IcoWeather/IcoWeather';
import { setDataWeather } from '../../actions/setDataWeather';
import { getWord } from '../../actions/dictionary';
import { getDayName } from '../../actions/helper';
import Text from '../../components/Text/Text';
import DaysView from './DaysView/DaysView';

const { width, height } = Dimensions.get('screen');

export interface PropsHome extends PropsWeather {
    addData: (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number|null) => void;
    setDataCurrent: (dayIndex: number, data: object) => void;
    setDataCurrentNow: () => void;
};

const days = 4;

const Home: React.FC<PropsHome> = ({ weather:state, addData, setDataCurrent, setDataCurrentNow }) => {

    const _ = getWord;
    const [readingPermissions, setReadingPermissions] = useState(false);
    const [daysDataTemperatures, setDaysDataTemperatures] = useState([]);
    const [currentData, setSurrentData] = useState<CurrentDataType>(state.current);
    const [reload, setReload] = useState(0);
    const [changed, setChanged] = useState(true);
    const [currentName, setCurrentName] = useState('');
    const [indexSwiper, setIndexSwiper] = useState(0);
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const ref = useRef<any>();

    useEffect(() => {
        if (isFocused){
            const onBackPress = () => {
                if (indexSwiper === 1){
                    ref.current.scrollTo(0);
                } else if (state.actualIndexData >= 0){
                    setDataCurrentNow();
                } else {
                    navigation.openDrawer();
                }
                return true;
            };
    
            BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
            return () =>
            BackHandler.removeEventListener('hardwareBackPress', onBackPress);
        }
    },[isFocused, state.actualIndexData, indexSwiper]);

    useEffect(() => {
        if (state.actualIndexData < 0){
            setCurrentName(_(state.lang,'Teraz'));
        } else {
            const dayName = getDayName(state.actualIndexData);
            setCurrentName(_(state.lang,dayName[0]) + (dayName[1] ? dayName[1] : ''));
        }
    },[currentData, state.lang]);

    useEffect(() => {

        realoadData();

    },[reload]);

    useEffect(() => {
        const tempData = [];
        state.weatherData.days.filter((dataHour: DayType, index: number) => index < days).forEach((data: DayType) => {
            data.hours.forEach((dataHour: HourType) => {
                if (dataHour.temp !== null) tempData.push(dataHour.temp);
                else tempData.push(data.temp);
            });
        });
        setDaysDataTemperatures(tempData);
    },[state.weatherData.days]);

    useEffect(() => {
        setChanged(false);
        setTimeout(() => {
            setSurrentData(state.current);
            setChanged(true);
        },400);
    },[state.current]);

    const realoadData = () => {
        setReadingPermissions(true);
        setDataWeather(state.dataType === 'city', state.actualCity ? state.actualCity.shortName : '', state.position, state.actualCity, addData, (result: number) => {
            setReadingPermissions(false);
            if (result === 0){
                Alert.alert(_(state.lang,'Nie znalazłem miejscowości'));
            }
        },state.actualIndexData >=0 ? state.actualIndexData : null);
    }

    const handleSetCurrent = (dayIndex: number, dataDay: DayType): void => {
        if (state.actualIndexData !== dayIndex){
            setDataCurrent(dayIndex, dataDay);
        } else {
            setDataCurrentNow();
        }
    }

    const handleToggleMenu = (): void => {
        navigation.openDrawer();
    }

    const setCurrentDataDay = (index: number, data: DayType): void => {
        handleSetCurrent(index, data);
        ref.current.scrollTo(0);
    }

    return (
        <SafeAreaView style={style.safeArea}>
            <LinearGradient
                colors={backgroundColors}
                style={style.main}
            >
                <Swiper loop={false} autoplay={false} showsButtons={false} showsPagination={false} ref={ref} index={indexSwiper} onIndexChanged={index => setIndexSwiper(index)}>
                    <ScrollView 
                        contentContainerStyle={style.bodyScroll} 
                        refreshControl={
                            <RefreshControl
                                refreshing={readingPermissions}
                                onRefresh={() => setReload(old => old + 1)}
                            />
                        }
                    >
                        <TouchableHighlight onPress={handleToggleMenu} style={style.menuLayer}>
                            <Icon name="menu" color="#fff" size={24} />
                        </TouchableHighlight>

                        <View style={style.locationFrom}>
                            <Text style={style.textLocation}>
                                {_(state.lang,'Lokacja')}: {" "}
                                <Text style={{...style.textLocation, ...style.locationName}}>{state.dataType === 'city' ? state.actualCity.name : `${state.position.latitude},${state.position.longitude}`}</Text>
                            </Text>
                        </View>

                        <View style={style.body}>
                            {state.weatherData.days.length > 0 && 
                                <>
                                    <MotiView from={{ opacity: changed ? 0 : 1, top: changed ? -30 : 0 }} animate={{ opacity: changed ? 1 : 0, top: changed ? 0 : -30 }} transition={{ type: 'timing', delay: 20 }}>
                                        <Text numberOfLines={1} style={{...style.today, ...(state.actualIndexData < 0 ? style.todayNow : {})}}>{currentName}</Text>
                                    </MotiView>
                                    <MotiView from={{ opacity: changed ? 0 : 1, top: changed ? -30 : 0 }} animate={{ opacity: changed ? 1 : 0, top: changed ? 0 : -30 }} transition={{ type: 'timing', delay: 50 }}>
                                        <Text style={style.temperature}>{currentData.temperature}°C</Text>
                                    </MotiView>
                                    <MotiView from={{ opacity: changed ? 0 : 1, top: changed ? -30 : 0 }} animate={{ opacity: changed ? 1 : 0, top: changed ? 0 : -30 }} transition={{ type: 'timing', delay: 220 }}>
                                        <Text numberOfLines={1} style={style.feeling}>{_(state.lang,'Odczuwalna')}: <Text style={{...style.feeling, ...style.feelingValue, ...(currentData.feelslike !== currentData.temperature ? style.feelingValueBad : {})}}>{currentData.feelslike}°C</Text></Text>
                                    </MotiView>
                                    <MotiView from={{ opacity: changed ? 0 : 1, top: changed ? -70 : 0 }} animate={{ opacity: changed ? 1 : 0, top: changed ? 0 : -70 }} transition={{ type: 'timing', delay: 100 }}>
                                        <IcoWeather size={height <= maxResponsiveHeight ? 160 : 220} icon={currentData.icon} />
                                    </MotiView>
                                    <MotiView from={{ opacity: changed ? 0 : 1, top: changed ? -30 : 0 }} animate={{ opacity: changed ? 1 : 0, top: changed ? 0 : -30 }} transition={{ type: 'timing', delay: 120 }}>
                                        <Text style={style.pressure}>{_(state.lang,'Ciśnienie')}: <Text style={{...style.pressure, ...style.pressureValue}}>{currentData.pressure}</Text>hPa</Text>
                                        <Text style={style.pressure}>{_(state.lang,'Wilgotność')}: <Text style={{...style.pressure, ...style.pressureValue}}>{currentData.humidity}</Text>%</Text>
                                        {currentData.wind &&
                                            <Text style={style.pressure}>{_(state.lang,'Wiatr')}: <Text style={{...style.pressure, ...style.pressureValue}}>{currentData.wind} {_(state.lang,'km/h')}</Text></Text>
                                        }
                                    </MotiView>
                                    {(currentData.hours && currentData.hours.length) > 0 &&
                                        <MotiView style={style.chartLayer} from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ type: 'timing', delay: 500 }}>
                                            <TemperatureDayChart hourData={currentData.hours} />
                                        </MotiView>
                                    }
                                </>
                            }
                        </View>
                        {state.weatherData.days.length > 0 &&
                            <View style={style.bottomLayer}>

                                <ScrollView contentContainerStyle={style.bottomScrollView} horizontal>
                                    <View style={{ flex: 1 }}>

                                        <LineChart
                                            data={{
                                                labels: [],
                                                datasets: [
                                                    {
                                                        data: daysDataTemperatures
                                                    }
                                                ]
                                            }}
                                            withHorizontalLabels={false}
                                            withVerticalLabels={false}
                                            withHorizontalLines={false}
                                            withVerticalLines={false}
                                            xLabelsOffset={0}
                                            transparent
                                            withShadow={false}
                                            width={((width / 4) * days) + ((width/days)/2.5)} // from react-native
                                            height={height <= maxResponsiveHeight ? 50 : 60}
                                            withDots={false}
                                            yAxisInterval={1} // optional, defaults to 1
                                            chartConfig={{
                                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                propsForDots: {
                                                    r: 3,
                                                    strokeWidth: 1,
                                                    stroke: "#ffa726"
                                                }
                                            }}
                                            bezier
                                            style={style.lineChart}
                                        />
                                        <View style={style.days}>
                                            {state.weatherData.days.filter((data: DayType,index: number) => index < days).map((data: DayType, index: number) => {
                                                const dayName = getDayName(index);
                                                return (
                                                    <TouchableHighlight key={`data: ${data.datetime}`} onPress={() => handleSetCurrent(index, data)} style={{...style.shortWeather, ...(state.actualIndexData === index ? style.shortWeatherSelected : {})}}>
                                                        <ShortWeather
                                                            weather={data}
                                                            temperature={data.temp}
                                                            index={index}
                                                            title={_(state.lang,dayName[0]) + (dayName[1] ? dayName[1] : '')}
                                                        />
                                                    </TouchableHighlight>
                                                )
                                            })}
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        }
                        
                    </ScrollView>
                    <DaysView 
                        daysData={state.weatherData.days}
                        lang={state.lang}
                        getWord={_}
                        setCurrent={setCurrentDataDay}
                        currentDatatime={currentData.datetime}
                    />
                </Swiper>
            </LinearGradient>
        </SafeAreaView>
    );
}

const mapStateToProps = (state: object) => {
    return state;
};

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      addData,
      setDataCurrent,
      setDataCurrentNow,
    }, dispatch)
);

export default connect<any>(mapStateToProps, mapDispatchToProps)(Home);

const style = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    main: {
        flex: 1,
        width
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyScroll: {
        flex: 1,
    },
    temperature: {
        color: '#fff',
        fontSize: height <= maxResponsiveHeight ? 60 : 45,
        lineHeight: height <= maxResponsiveHeight ? 60 : 45,
    },
    today: {
        fontSize: height <= maxResponsiveHeight ? 16 : 18,
        lineHeight: height <= maxResponsiveHeight ? 16 : 18,
        marginBottom: 10,
        color: '#808080',
    },
    todayNow: {
        color: '#24bb45'
    },
    linearGradient: {
        flex: 1,
        minHeight: 20,
        minWidth: 200,
    },
    locationFrom: {
        flex: 1,
        maxHeight: 60,
        paddingLeft: 20,
        paddingTop: 10,
    },
    textLocation: {
        color: '#b6b6b6',
        fontSize: 11,
        marginRight: 50,
        marginTop: 5,
    },
    locationName: {
        fontFamily: fontBold,
        color: '#fff'
    },
    bottomLayer: {
        flex: 1,
        maxHeight: height <= maxResponsiveHeight ? 150 : 180,
        backgroundColor: '#4c67b3'
    },
    bottomScrollView: {
    },
    days: {
        flexDirection: 'row',
        flex: 1,
    },
    pressure: {
        fontSize: 16,
        lineHeight: 16,
        color: '#afafaf',
        marginBottom: 5,
        alignSelf: 'center'
    },
    pressureValue: {
        color: '#fff',
    },
    shortWeather: {
        flex: 1,
        minWidth: width/4,
        maxWidth: width/4,
        justifyContent: 'center'
    },
    shortWeatherSelected: {
        flex: 1,
        backgroundColor: 'rgba(16, 30, 71, 0.349)'
    },
    menuLayer: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 5,
    },
    feeling: {
        fontSize: 16,
        color: '#808080'
    },
    feelingValue: {
        color: '#fdfdfd'
    },
    feelingValueBad: {
        color: '#fa0000'
    },
    loadingData: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    lineChart: {
        marginVertical: 8,
        paddingLeft: 0,
        marginLeft: -(width/4)/2,
        marginTop: 10,
        marginBottom: 0,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
        paddingTop: 0,
        paddingBottom: 0,
    },
    chartLayer: {

    }

});