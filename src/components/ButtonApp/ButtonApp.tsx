import React , { useState, useEffect, useContext } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import Text from '../../components/Text/Text';

type ComponentaTypes = {
    title: string,
    action: () => void,
    style?: object,
    styleText?: object
}

const ButtonApp: React.FC<ComponentaTypes> = ({ title, action, styleText = {}, style: styleMain = {} }) => {

    return (
        <TouchableHighlight onPress={action} style={{...style.main,...styleMain}}>
            <View>
                <Text style={{...style.text, ...styleText}}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
}
export default ButtonApp;

const style = StyleSheet.create({
    main: {
        backgroundColor: '#2196f3',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
    },
    text: {
        color: '#fff',
        fontSize: 14,
        lineHeight: 14,
    }
});