import React from 'react';
import { View } from 'react-native';

const BarSection = ({ children, newBarSectionStyle }) => {
    const { barSectionStyle } = styles;

    return (
        <View style={[barSectionStyle, newBarSectionStyle]}>
            {children}
        </View>
    );
};

const styles = {
    barSectionStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '100%'
    }
};

export { BarSection };
