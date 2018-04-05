import React from 'react';
import { View } from 'react-native';

const BarCard = ({ children, newCardStyle }) => {
    const { barCardStyle } = styles;

    return (
        <View style={[barCardStyle, newCardStyle]}>
            {children}
        </View>
    );
};

const styles = {
    barCardStyle: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%'
    }
};

export { BarCard };
