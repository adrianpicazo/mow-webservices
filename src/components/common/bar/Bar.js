import React from 'react';
import { View, Dimensions } from 'react-native';
import { colors } from '../../../res/Colors';

const screenSize = Dimensions.get('window');

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
        width: screenSize.width,
        backgroundColor: colors.BLACK,
        padding: 5
    }
};

export { Bar };
