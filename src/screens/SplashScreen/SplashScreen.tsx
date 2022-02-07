import { StyleSheet, SafeAreaView, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { bindActionCreators } from 'redux';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MotiView } from 'moti';

import { setDataWeather } from '../../actions/setDataWeather';
import { setFullState, addData } from '../../Store/actions';
import { backgroundColors } from '../../actions/variables';
import { PropsWeather } from '../../Store/interfaces';
import { getWord } from '../../actions/dictionary';
import Text from '../../components/Text/Text';

const ImgLogo = require('../../../assets/images/logo.png');

export interface PropsSettings extends PropsWeather {
    setFullState: (state: object) => void;
    addData: (position: object, actualCity: object, dataType: String, dataWeather: object, dayIndex?: number|null) => void;
};

const SplashScreen = ({ weather:state, setFullState }) => {

    const _ = getWord;
    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.getItem('dataState',(error:  Error, result: string) => {
            if (!error && result){
                const dataResult = JSON.parse(result);
                setFullState(dataResult);
                setDataWeather(dataResult.dataType === 'city', dataResult.actualCity ? dataResult.actualCity.name : '', dataResult.position, dataResult.actualCity, addData, (result: number) => {
                    if (result > 0){
                        navigation.navigate("Home" as never);
                    } else if (result === 0){
                        Alert.alert(_(state.lang,'Nie znalazłem miejscowości'));
                    }
                });

            } else {
                setTimeout(() => {
                    navigation.navigate("Settings" as never);
                },1500);
            }
        });
    },[]);

    return (
        <SafeAreaView style={style.safeAreaView}>
            <LinearGradient style={style.main} colors={backgroundColors}>
                <Image source={ImgLogo} style={style.imageLogo} />
                <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ loop: true, type: 'timing', duration: 500, }}>
                    <Text style={style.loadingLabel}>
                        {_(state.lang,'Ładuję dane ...')}
                    </Text>
                </MotiView>
            </LinearGradient>
        </SafeAreaView>
    );
}
const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
      setFullState,
    }, dispatch)
);

const mapStateToProps = (state: object) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const style = StyleSheet.create({
    safeAreaView: {
        flex: 1,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogo: {
        width: 120,
        height: 120,
        marginBottom: 60,
    },
    loadingLabel: {
        fontSize: 14,
        color: '#fff'
    }
});