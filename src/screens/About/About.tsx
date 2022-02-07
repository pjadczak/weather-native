import { View, StyleSheet, TouchableHighlight, Image, TouchableOpacity, Linking, Dimensions, TouchableWithoutFeedback, SafeAreaView, ScrollView, BackHandler } from 'react-native';
import { useNavigation, useIsFocused, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { MotiView } from 'moti';

import { fontBold, backgroundColors, authorEmail, authorPhone, authorUrl, authorWww } from '../../actions/variables';
import { PropsWeather } from '../../Store/interfaces';
import { getWord } from '../../actions/dictionary';
import { version } from '../../../package.json';
import parseText from '../../actions/parseText';
import { displayName } from '../../../app.json';
import Text from '../../components/Text/Text';

const ImgLogo = require('../../../assets/images/logo.png');
const { width } = Dimensions.get('window');
const defaultFontSize = 15;

type ContactType = 'email' | 'www' | 'phone';

const About: React.FC<PropsWeather> = ({ weather:state }) => {

    const navigation = useNavigation<any>();
    const isFocused = useIsFocused();
    const _ = getWord;

    useFocusEffect(() => {
        const onBackPress = () => {
            navigation.openDrawer();
            return true;
        };

        BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    });

    useEffect(() => {
        
    },[isFocused]);

    const handleToggleMenu = (): void => {
        navigation.openDrawer();
    }

    const handleActionContact = (contactType : ContactType): void => {
        if (contactType === 'email'){
            Linking.openURL('mailto:'+authorEmail+'&subject=Kontakt w sprawie aplikacji');
        } else if (contactType === 'phone'){
            Linking.openURL('tel:'+authorPhone);
        } else if (contactType === 'www'){
            Linking.openURL(authorUrl);
        }
    }

    const handlePressWeatherProvider = (): void => {
        Linking.openURL('https://www.visualcrossing.com/');
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <LinearGradient style={style.main} colors={backgroundColors}>
                
                <TouchableHighlight onPress={handleToggleMenu} style={style.menuLayer}>
                    <Icon name="menu" color="#fff" size={24} />
                </TouchableHighlight>

                <MotiView style={style.header} from={{ top: isFocused ? -100 : 0, opacity: isFocused ? 0 : 1 }} animate={{ top: isFocused ? 0 : -100, opacity: isFocused ? 1 : 0 }}>
                    <Image source={ImgLogo} style={style.imageLogo} />
                    <Text style={style.headerTitle}>{displayName} <Text style={{...style.headerTitle, ...style.headerTitleValue}}>v.{version}</Text></Text>
                </MotiView>

                <ScrollView>
                    <View style={style.body}>
                        <Text style={style.bodyInfo}>
                            {parseText(_(state.lang,'Aplikacja wykonana za pomocą <bold>React Native</bold> w języku <bold>TypeScript</bold>. Aplikacja oparta o biblioteki:'))}
                            {/* Aplikacja wykonana za pomocą <Text style={{...style.bodyInfo, ...style.bodyInfoBold}}>React Native</Text> w języku <Text style={{...style.bodyInfo, ...style.bodyInfoBold}}>TypeScript</Text>. Aplikacja oparta o biblioteki:   */}
                        </Text>
                        <View style={style.bodyUl}>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Vector Icons</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Get Location</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Navigator</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Chart Kit</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>Moti</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Redux</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Swiper</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Permissions</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>React Native Linear Gradient</Text></View>
                            <View style={style.bodyUlRow}><Icon name="circle-small" color="#808080" /><Text style={style.bodyRowText}>Styled Text for React Native</Text></View>
                        </View>
                        <View style={style.author}>
                            <Text style={style.weatherInfo}>
                                {_(state.lang,"Dane pogodowe zbierane z:")}{" "}
                                <TouchableWithoutFeedback onPress={handlePressWeatherProvider}>
                                    <Text style={{...style.weatherInfo, ...style.weatherInfoValue}}>VisualCrossing</Text>
                                </TouchableWithoutFeedback>
                            </Text>

                            <Text style={style.weatherInfo}>
                                {_(state.lang,'Źródło aplikacji na githubie:')}{" "}
                                <TouchableWithoutFeedback onPress={handlePressWeatherProvider}>
                                    <Text style={{...style.weatherInfo, ...style.weatherInfoValue}}>Github project</Text>
                                </TouchableWithoutFeedback>
                            </Text>

                            {parseText(_(state.lang,'Autor:')+' <bold>Jadczak Paweł</bold>')}

                            <View style={style.authorContact}>
                                <Text style={style.authorContactHeader}>{_(state.lang,'Kontakt')}</Text>

                                <View style={style.contactBody}>
                                    <TouchableOpacity style={style.contactIco} onPress={() => handleActionContact("email")}>
                                        <View style={style.contactIcoBody}>
                                            <Icon name="at" color="#fff" size={50} />
                                            <Text style={style.contactIcoText}>{authorEmail}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.contactIco} onPress={() => handleActionContact("www")}>
                                        <View style={style.contactIcoBody}>
                                            <Icon name="web" color="#fff" size={50} />
                                            <Text style={style.contactIcoText}>{authorWww}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.contactIco} onPress={() => handleActionContact("phone")}>
                                        <View style={style.contactIcoBody}>
                                            <Icon name="phone-outline" color="#fff" size={50} />
                                            <Text style={style.contactIcoText}>{authorPhone}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </LinearGradient>
        </SafeAreaView>
    );
}

const mapStateToProps = (state: object) => {
    return state;
};

export default connect(mapStateToProps)(About);

const style = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#ff0',
    },
    menuLayer: {
        position: 'absolute',
        top: 10,
        right: 15,
        zIndex: 5,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 50,
    },
    imageLogo: {
        width: 120,
        height: 120,
        marginBottom: 30,
    },
    headerTitle: {
        color: '#cacaca',
        fontFamily: fontBold,
        fontSize: 24,
        lineHeight: 24,
    },
    headerTitleValue: {
        color: '#fff',
    },
    body: {

    },
    bodyInfo: {
        paddingHorizontal: 20,
    },
    bodyUl: {
        marginLeft: 30,
        marginTop: 20,
    },
    bodyUlRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyRowText: {
        color: '#dfdfdf',
        flex: 1,
        marginLeft: 5,
        fontSize: 12,
        lineHeight: 12,
    },
    author: {
        marginTop: 20,
        marginLeft: 20
    },
    authorContact: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    authorContactHeader: {
        color: '#c4c4c4',
        fontSize: 20,
        lineHeight: 20,
    },
    contactBody: {
        flexDirection: 'row',
        marginTop: 30,
        maxWidth: width,
        maxHeight: 120,
        marginBottom: 20,
    },
    contactIco: {
        width: (width/3) - 10,
    },
    contactIcoBody: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    contactIcoText: {
        color: '#ffc107',
        fontSize: 12,
        lineHeight: 12,
        marginTop: 5,
    },
    weatherInfo: {
        color: '#eeeeee',
        fontSize: defaultFontSize,
        lineHeight: defaultFontSize,
        marginBottom: 10,
    },
    weatherInfoValue: {
        color: '#fff',
        fontFamily: fontBold
    }

});