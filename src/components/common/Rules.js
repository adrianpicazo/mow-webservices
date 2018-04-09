import React from 'react';
import { View } from 'react-native';
import { colors } from '../../res/Colors';

const HorizontalRule = ({ style, marginLeft = 0, marginRight = 0 }) => {
    const { defaultStyle } = styles.horizontal;

    return (
        <View style={[defaultStyle, { marginLeft, marginRight }, style]} />
    );
};

const styles = {
    horizontal: {
        defaultStyle: {
            backgroundColor: colors.BLUE.N300,
            height: 1
        }
    }
};

export { HorizontalRule };
