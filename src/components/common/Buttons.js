import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../res/Colors';

const Button = ({ onPress, children, textStyle, buttonStyle }) => {
    const { defaultButtonStyle, defaultTextStyle } = styles.button;

    return (
        <TouchableOpacity onPress={onPress} style={[defaultButtonStyle, buttonStyle]}>
            <Text style={[defaultTextStyle, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    );
};

const IconButton = ({ onPress, image, buttonStyle, imageStyle }) => {
    const { defaultButtonStyle, defaultImageStyle } = styles.iconButton;

    return (
        <TouchableOpacity onPress={onPress} style={[defaultButtonStyle, buttonStyle]}>
            <Image
                style={[defaultImageStyle, imageStyle]}
                source={image}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const FloatingButton = ({ onPress, image, buttonStyle, imageStyle }) => {
    const { defaultButtonStyle, defaultImageStyle } = styles.floatingButton;

    return (
        <TouchableOpacity onPress={onPress} style={[defaultButtonStyle, buttonStyle]}>
            <Image
                style={[defaultImageStyle, imageStyle]}
                source={image}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = {
    button: {
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
    },
    iconButton: {
        defaultButtonStyle: {
            padding: 3,
            borderWidth: 1,
            borderRadius: 3,
            borderColor: colors.BLUE_GREY.N400
        },
        defaultImageStyle: {
            height: '100%',
            width: undefined,
            tintColor: colors.BLUE_GREY.N400
        }
    },
    floatingButton: {
        defaultButtonStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            backgroundColor: colors.BLUE.N700,
            bottom: 20,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: 25,
            elevation: 8,
            shadowColor: colors.BLACK,
            shadowOpacity: 0.4,
            shadowOffset: {
                width: 1,
                height: 5,
            },
        },
        defaultImageStyle: {
            height: 35,
            width: 35,
            tintColor: colors.WHITE
        },
    }
};

export { Button, IconButton, FloatingButton };
