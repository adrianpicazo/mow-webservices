import React from 'react';
import { View } from 'react-native';

const Card = ({ children, style }) => {
    const { defaultStyle } = styles.card;

    return (
        <View style={[defaultStyle, style]}>
            {children}
        </View>
    );
};

const CardSection = ({ children, style }) => {
    const { defaultStyle } = styles.cardSection;

    return (
        <View style={[defaultStyle, style]}>
            {children}
        </View>
    );
};

const styles = {
    card: {
        defaultStyle: {
            //backgroundColor: '#ff5e44',
            position: 'relative',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 10,
        }
    },
    cardSection: {
        defaultStyle: {
            //backgroundColor: '#08ff1a',
            position: 'relative',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 5
        }
    }
};

export { Card, CardSection };
