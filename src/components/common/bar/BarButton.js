import React from 'react';
import { TouchableOpacity, Image } from 'react-native';

const BarButton = ({ onPress, image }) => {
    const { buttonStyle, imageStyle } = styles;

    return (
        <TouchableOpacity
            style={buttonStyle}
            onPress={onPress}
        >
            <Image
                style={imageStyle}
                source={image}
                resizeMode="contain"
            />
        </TouchableOpacity>
    );
};

const styles = {
    imageStyle: {
        height: '100%',
        width: undefined,
        tintColor: '#ffffff'
    },
    buttonStyle: {
        height: 30,
        width: 30,
        marginRight: 5,
        marginLeft: 5,
        padding: 3,
        borderWidth: 1,
        borderRadius: 3,
        borderColor: '#ffffff'
    }
};

export { BarButton };
