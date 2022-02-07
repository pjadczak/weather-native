import { View, StyleSheet, SafeAreaView, Image, Switch, Button, TextInput, Alert, BackHandler, TouchableHighlight, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import React , { useEffect, useReducer } from 'react';
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
import Store from './Store';

export interface PropsSettings extends PropsWeather {
    addData: (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number|null) => void;
    setGpsPermission: (gpsPermission: boolean) => void;
};

export type LocalStateType = {
    loader: boolean,
    switchType: boolean,
    city: string,
    position: { latitude: number, longitude: number }
}

const defaultLocalState = {
    loader: false,
    switchType: false,
    city: '',
    position: null
} 

const MIN_CITY_LENGTH = 3;
const ImgLogo = require('../../../assets/images/logo.png');

const Settings: React.FC<PropsSettings> = ({ weather:state, addData, setGpsPermission }) => {

    const _ = getWord;
    const [localState, setLocalState] = useReducer(Store, defaultLocalState);
    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();

    useEffect(() => {

        checkPermition((status: boolean|null) => {
            
            if (status === true){

                setGpsPermission(true);

                getLocation(result => {
                    if (result){
                        setStateData('position',result);
                    }
                });

            } else if (status === false){
                setGpsPermission(false);
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
            setStateData('city',state.actualCity.shortName);
        }

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    },[isFocused]);

    useEffect(() => {
        if (state.position || state.actualCity){
            AsyncStorage.setItem('dataState',JSON.stringify(state));
        }
    },[state.actualCity, state.position]);

    // set local state
    const setStateData = (dataType: string, data: any ): void => {
        setLocalState({ type: 'SET_DATA', dataType, data });
    }

    const handleAddResult = (): void => {
        // get lat/lon by find city data

        if (!localState.switchType && localState.city.length <=2) return;

        setStateData('loader',true);
        setDataWeather(!localState.switchType,localState.city, localState.position, state.actualCity, addData, (result: number) => {
            setStateData('loader',false);
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
                        value={localState.city}
                        onChangeText={text => setStateData('city',text)}
                        style={{...style.textInput, ...(localState.switchType ? style.textInputDisabled : {}), ...(Platform.OS === 'ios' ? style.textInputIos : {})}}
                        editable={!localState.switchType}
                    />
                </View>

                {localState.position &&
                    <View style={style.layerPosition}>
                        <Text style={style.textAlternative}>{_(state.lang,'... lub Pobierz pogodę z danych Twojego położenia')}</Text>
                        <Switch
                            value={localState.switchType}
                            onValueChange={v => setStateData('switchType',v)}
                        />

                        <Text style={{...style.textPosition, ...(localState.switchType ? style.textPositionActive : {})}}>{_(state.lang,'Twoje położenie')}: <Text style={{...style.textPositionValue, ...(localState.switchType ? style.textPositionValueActive : {})}}>{localState.position.latitude} , {localState.position.longitude}</Text></Text>
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
            {localState.loader && <Loading title={!localState.switchType ? _(state.lang,"Szukam lokacji") : _(state.lang,"Szukam pozycji GPS")} />}
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