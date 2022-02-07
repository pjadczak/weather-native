import StyledText from 'react-native-styled-text';
import { StyleSheet } from 'react-native';
import React from 'react';

import { fontBold, fontMain } from './variables';
import Text from '../components/Text/Text';

const replaceCumulative = (str, find, replace) => {
    for (var i = 0; i < find.length; i++)
        str = str.replace(new RegExp(find[i],"g"), replace[i]);
    return str;
};

const parseText = (content: String,style: object|null = null, styleTop: object = {} ) => {
    const tempContent = replaceCumulative(
        content,
        ['<h1>','</h1>','<h2>','</h2>','<h3>','</h3>','<h4>','</h4>','<h5>','</h5>','<div>','</div>','<p>','</p>','<Content>','</Content>'],
        ['\n<header>','</header>\n','\n<header>','</header>\n','\n<header>','</header>\n','\n<header>','</header>\n','\n<header>','</header>\n','<paragraph>','</paragraph>\n','<paragraph>','</paragraph>\n']
    );

    return (
        <Text style={{ ...styleTop, ...Stylize.default }}>
            <StyledText textStyles={style === null ? Stylize : style}>
            
                {tempContent.split('<br>').join('\n')}
            
            </StyledText>
        </Text>
    );
}

const Stylize = StyleSheet.create({
    default: {
        fontSize: 15,
        lineHeight: 15,
        color: '#cccccc',
        fontFamily: fontMain
    },
    bold: {
        color: '#fff',
        fontFamily: fontBold
    },
    black: {
        color: '#000'
    },
    white: {
        color: '#fff'
    },
    grey: {
        color: '#808080'
    },
    p: { color: '#000' },
    content: {
        fontSize: 16,
        lineHeight: 16,
    },
    br:{},
});


export default parseText;