import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { colors } from '../../res/Colors';

const Button = ({ onPress, children, textStyle, buttonStyle }) => {
    const { defaultButtonStyle, defaultTextStyle } = styles;

    return (
        <TouchableOpacity onPress={onPress} style={[defaultButtonStyle, buttonStyle]}>
            <Text style={[defaultTextStyle, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};


const styles = {
    defaultTextStyle: {
        alignSelf: 'center',
        color: colors.WHITE,
        fontSize: 14,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
    },
    defaultButtonStyle: {
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: colors.BLUE.N700,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: colors.WHITE
    }
};

export { Button };
