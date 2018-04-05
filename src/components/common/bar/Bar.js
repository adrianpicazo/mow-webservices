import React from 'react';
import { View, Dimensions } from 'react-native';
import COStatusBar from '../../auxiliar/COStatusBar';

const screenSize = Dimensions.get('window'); // {width: number, height: number}

const Bar = ({ children, newBarStyle }) => {
    const { barStyle } = styles;

    return (
        <View>
            <COStatusBar />
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
        backgroundColor: '#86a8ff',
        padding: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
    }
};

export { Bar };
