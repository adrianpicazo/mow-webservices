import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

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
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '800',
        paddingTop: 10,
        paddingBottom: 10
    },
    buttonStyle: {
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: '#d0d0d0',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ffffff'
    }
};

export { Button };
