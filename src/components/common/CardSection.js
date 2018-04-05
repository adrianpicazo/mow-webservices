import React from 'react';
import { View } from 'react-native';

const CardSection = ({ children, style }) => {
    const { defaultStyle } = styles;

    return (
        <View style={[defaultStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    defaultStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative'
    }
};

export { CardSection };
