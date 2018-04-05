import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../../res/Colors';

const Button = ({ onPress, children, newTextStyle, newButtonStyle }) => {
    const { buttonStyle, textStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={[buttonStyle, newButtonStyle]}>
            <Text style={[textStyle, newTextStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const styles = {
    textStyle: {
        alignSelf: 'center',
        color: colors.WHITE,
        fontSize: 14,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: colors.BLUE.N700,
        borderRadius: 5
    }
};

export { Button };
