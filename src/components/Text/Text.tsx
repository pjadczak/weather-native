import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { fontMain } from '../../actions/variables';

const TextComponent: React.FC<any> = props => {

    return (
        <Text {...props} style={{...style.main,...(props.style ? props.style : {})}}>{props.children}</Text>
    );
}
export default TextComponent;

const style = StyleSheet.create({
    main: {
        fontFamily: fontMain
    }
});