import React from 'react';
import { View } from 'react-native';
import { colors } from '../../../res/Colors';

const Bar = ({ children, newBarStyle }) => {
    const { barStyle } = styles;

    return (
        <View>
            <View style={[barStyle, newBarStyle]}>
                {children}
            </View>
        </View>
    );
};

const styles = {
    barStyle: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 56,
        width: '100%',
        backgroundColor: colors.WHITE,
        padding: 5
    }
};

export { Bar };
