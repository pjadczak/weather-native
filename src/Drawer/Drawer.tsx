import { View, StyleSheet, Image, FlatList, ListRenderItem, TouchableOpacity, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { dictionary } from '../actions/dictionary';
import { WeatherType } from '../Store/interfaces';
import { getWord } from '../actions/dictionary';
import { displayName } from '../../app.json';
import { setLang } from '../Store/actions';
import Text from '../components/Text/Text';

const ImgLogo = require('../../assets/images/logo.png');

type MenuItem = {
    title: String;
    path: string;
    ico: String;
}

type PropsDrawer = {
    weather: WeatherType;
    setLang: (langCode: String) => void;
} & DrawerContentComponentProps;
  
const Drawer: React.FC<PropsDrawer|any> = ({ weather:state, setLang }) => {

    const [languages, setLanguages] = useState([]);
    const navigation = useNavigation();
    const _ = getWord;

    useEffect(() => {
        let dataLangs = [];
        for (const [key] of Object.entries(dictionary)) {
            dataLangs.push(key);
        }
        setLanguages(dataLangs);
    },[]);

    const MenuItems: MenuItem[] = (state.actualCity || state.position) ? [
        { title: _(state.lang,'menu>>Pogoda'), path: "Home", ico: "weather-partly-cloudy" },
        { title: _(state.lang,'menu>>Ustawienia'), path: "Settings", ico: "crosshairs-gps" },
        { title: _(state.lang,'menu>>O aplikacji'), path: "About", ico: "information-outline" },
    ] : [
        { title: _(state.lang,'menu>>Ustawienia'), path: "Settings", ico: "crosshairs-gps" },
        { title: _(state.lang,'menu>>O aplikacji'), path: "About", ico: "information-outline" },
    ];

    const handleMenuPress = (data: MenuItem): void => {
        navigation.navigate(data.path as never);
    }

    const handleChangeLang = (lang: String): void => {
        const navState = navigation.getState();
        setLang(lang);
        AsyncStorage.setItem('dataState',JSON.stringify({...state, lang}));
        navigation.navigate(navState.routes[navState.index]);
        // navigation.closeDrawer();// dont work here !!
    }

    const Item = ({ data, index }: { data: MenuItem, index: number }) => (
        <TouchableOpacity onPress={() => handleMenuPress(data)} style={{...style.menuItem, ...(index === 0 ? style.menuItemFirst : {})}}>
            <View style={style.menuItemBody}>
                <Icon name={data.ico} size={26} color={'#808080'} />
                <Text style={style.menuItemText}>{data.title}</Text>
            </View>
        </TouchableOpacity>
      );

      const renderItem: ListRenderItem<MenuItem> = ({ item, index }) => (
        <Item data={item} index={index} />
     )

     const handleExitApp = ():void => {
        BackHandler.exitApp();
     }


    return (
        <View style={style.main}>
            <View style={style.header}>
                <Image source={ImgLogo} style={style.imageLogo} />
                <Text style={style.headerTitle}>{displayName}</Text>
            </View>
            <View style={style.body}>
                <FlatList 
                    data={MenuItems}
                    keyExtractor={(item: MenuItem|any) => item.title}
                    renderItem={renderItem}
                    numColumns={2}
                    columnWrapperStyle={{ flexDirection: 'column' }}
                    style={{ flexGrow: 0 }}
                />
                {languages.length>0 &&
                    <View style={style.languages}>
                        {languages.map((lang: string) => (
                            <TouchableOpacity onPress={() => handleChangeLang(lang)} key={`flag_${lang}`}>
                                <Image 
                                    source={dictionary[lang].image} 
                                    style={{...style.imageFlag, ...(state.lang === lang ? style.imageFlagSelected : {})}} 
                                />
                            </TouchableOpacity>
                        ))}
                    </View>
                }
            </View>
            <View style={style.exitLayer}>
                <TouchableOpacity style={{ flex: 1, }} onPress={handleExitApp}>
                    <View style={style.exitBody}>
                        <Icon name={'location-exit'} size={26} color={'#808080'} />
                        <Text style={style.exitText}>{_(state.lang,'Wyjdź z aplikacji')}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const mapDispatchToProps = (dispatch: any) => (
    bindActionCreators({
        setLang,
    }, dispatch)
);

const mapStateToProps = (state: object) => {
    return state;
};

export default connect(mapStateToProps, mapDispatchToProps)(Drawer);

const widthLogo = 100;

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        minHeight: 200,
        backgroundColor: '#4c67b3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageLogo: {
        maxWidth: widthLogo,
        maxHeight: widthLogo,
        width: widthLogo,
        height: widthLogo
    },
    headerTitle: {
        fontSize: 24,
        lineHeight: 24,
        color: '#fff',
        marginTop: 20,
    },
    body: {
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 25,
    },
    menuItem: {
        paddingVertical: 10,
        margin: 0,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0'
    },
    menuItemBody: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    menuItemFirst: {
        borderTopWidth: 0
    },
    menuItemText: {
        color: '#000',
        flex: 1,
        marginLeft: 15
    },
    languages: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    imageFlag: {
        width: 40,
        height: 24,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#b3b3b3',
        opacity: 0.5
    },
    imageFlagSelected: {
        borderColor: '#000000',
        borderWidth: 1,
        opacity: 1
    },
    exitLayer: {
        flex: 1,
        maxHeight: 50,
        backgroundColor: '#cecece'
    },
    exitBody: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    exitText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 14,
        color: '#f00'
    }
});