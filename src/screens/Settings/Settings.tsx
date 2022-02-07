import { View, StyleSheet, SafeAreaView, Image, Switch, Button, TextInput, Alert, BackHandler, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import React , { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { backgroundColors, fontBold } from '../../actions/variables';
import { addData, setGpsPermission } from '../../Store/actions';
import { setDataWeather } from '../../actions/setDataWeather';
import ButtonApp from '../../components/ButtonApp/ButtonApp';
import checkPermition from '../../actions/checkPermissions';
import { getLocation } from '../../actions/getLocation';
import Loading from '../../components/Loading/Loading';
import { PropsWeather } from '../../Store/interfaces';
import { getWord } from '../../actions/dictionary';
import Text from '../../components/Text/Text';

const ImgLogo = require('../../../assets/images/logo.png');

export interface PropsSettings extends PropsWeather {
    addData: (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number|null) => void;
    setGpsPermission: (gpsPermission: boolean) => void;
};

const MIN_CITY_LENGTH = 3;

const Settings: React.FC<PropsSettings> = ({ weather:state, addData, setGpsPermission }) => {

    const _ = getWord;
    const [readingPermissions, setReadingPermissions] = useState(false);
    const [loader, setLoader] = useState(false);
    const [switchType, setSwitchType] = useState(false);
    const [city, setCity] = useState('');
    const [position, setPosition] = useState(null);// current position
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    useEffect(() => {

        setReadingPermissions(true);
        checkPermition((status: boolean|null) => {
            
            if (status === true){

                setGpsPermission(true);

                getLocation(result => {
                    if (result){
                        setPosition(result);
                    }
                });

            } else if (status === false){
                setGpsPermission(false);
                setReadingPermissions(false);
            } else {
                setReadingPermissions(false);
            }

        });
    },[]);

    useEffect(() => {
        const onBackPress = () => {
            if (!state.position && !state.actualCity){
                navigation.openDrawer();
            } else {
                navigation.navigate("Home");
            }
            return true;
        };

        if (state.actualCity && state.actualCity.shortName !==''){
            setCity(state.actualCity.shortName);
        }

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    },[isFocused]);

    useEffect(() => {
        // console.log('zmiana: ',state.position);
        if (state.position || state.actualCity){
            AsyncStorage.setItem('dataState',JSON.stringify(state));
        }
    },[state.actualCity, state.position]);

    const handleAddResult = (): void => {
        // get lat/lon by find city data

        if (!switchType && city.length <=2) return;

        setLoader(true);
        setDataWeather(!switchType,city, position, state.actualCity, addData, (result: number) => {
            setLoader(false);
            if (result>0){
                navigation.navigate("Home");
            } else if (result === 0){
                Alert.alert(_(state.lang,'Nie znalazłem miejscowości'));
            }
            
        });
    }

    const handleBack = () => {
        navigation.navigate("Home");
    }

    const handleToggleMenu = (): void => {
        navigation.openDrawer();
    }

    return (
        <SafeAreaView style={style.safeAreaView}>
            <LinearGradient style={style.main} colors={backgroundColors}>

                <TouchableHighlight onPress={handleToggleMenu} style={style.menuLayer}>
                    <Icon name="menu" color="#fff" size={24} />
                </TouchableHighlight>

                <Image source={ImgLogo} style={style.imageLogo} />

                <View style={style.inputLayer}>
                    <Text style={style.textLabel}>{_(state.lang,'Wprowadź nazwę miejscowości')}</Text>
                    <TextInput
                        value={city}
                        onChangeText={text => setCity(text)}
                        style={{...style.textInput, ...(switchType ? style.textInputDisabled : {}), ...(Platform.OS === 'ios' ? style.textInputIos : {})}}
                        editable={!switchType}
                    />
                </View>

                {position &&
                    <View style={style.layerPosition}>
                        <Text style={style.textAlternative}>{_(state.lang,'... lub Pobierz pogodę z danych Twojego położenia')}</Text>
                        <Switch
                            value={switchType}
                            onValueChange={v => setSwitchType(v)}
                        />

                        <Text style={{...style.textPosition, ...(switchType ? style.textPositionActive : {})}}>{_(state.lang,'Twoje położenie')}: <Text style={{...style.textPositionValue, ...(switchType ? style.textPositionValueActive : {})}}>{position.latitude} , {position.longitude}</Text></Text>
                    </View>
                }

            <View style={style.buttonAdd}>
                {(state.actualCity || state.position) &&
                    <View style={style.backButton}>
                        <ButtonApp 
                            title={_(state.lang,'settings_button_cancel>>Anuluj')}
                            action={() => handleBack()}
                            style={{ backgroundColor: '#0c5e0c' }}
                        />
                    </View>
                }
                <ButtonApp 
                    title={_(state.lang,'settings_button>>Ustaw')}
                    action={() => handleAddResult()}
                />

            </View>

            </LinearGradient>
            {loader && <Loading title={!switchType ? _(state.lang,"Szukam lokacji") : _(state.lang,"Szukam pozycji GPS")} />}
        </SafeAreaView>
    );
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      addData,
      setGpsPermission,
    }, dispatch)
);

const mapStateToProps = (state: object) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const style = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    menuLayer: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 5,
    },
    imageLogo: {
        width: 120,
        height: 120,
        marginBottom: 60,
    },
    layerPosition: {
        alignItems: 'center'
    },
    textAlternative: {
        marginHorizontal: 30,
        marginTop: 20,
        marginBottom: 20,
        fontSize: 14,
        textAlign: 'center',
        color: '#ececec'
    },
    textPosition: {
        color: '#adadad',
        fontSize: 14,
        marginTop: 20
    },
    textPositionValue: {
        color: '#c5c5c5',
        fontFamily: fontBold
    },
    textPositionActive: {
        color: '#dddddd',
    },
    textPositionValueActive: {
        color: '#fff'
    },
    buttonAdd: {
        marginTop: 20,
        flexDirection: 'row'
    },
    backButton: {
        marginRight: 10,
    },
    inputLayer: {
        minWidth: 300,
    },
    textInput: {
        backgroundColor: '#fff',
        marginBottom: 10,
        color: '#000',
        paddingHorizontal: 15,
    },
    textInputIos: {
        padding: 15,
    },
    textInputDisabled: {
        backgroundColor: '#4f6daf'
    },
    textLabel: {
        color: '#d6d6d6',
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 14,
        marginBottom: 15,
    }
});