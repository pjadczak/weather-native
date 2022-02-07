import React , { useState, useEffect, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'; 
import Text from '../Text/Text';

const { width, height } = Dimensions.get('screen');

interface Props {
    title?: String,
    style?: object
}

const Loading: React.FC<Props> = ({ title = '', style: styleProp = {} }) => {

    return (
        <View style={{...style.main, ...styleProp}}>
            {title && <Text style={style.title}>{title}</Text>}
            <ActivityIndicator size={'small'} color={'#fff'} />
        </View>
    );
}
export default Loading;

const style = StyleSheet.create({
    main: {
        width,
        height,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: '#8f8f8f',
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
        fontSize: 12,
        lineHeight: 12,
        marginBottom: 20,
    }
});