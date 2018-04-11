import React from 'react';
import { Text, Image, TouchableHighlight } from 'react-native';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';
import { CardSection } from '../../common';

const UserAccountMenuItem = ({ image, label, onPress }) => {
    const { imageStyle, cardSectionStyle } = styles;

    return (
        <TouchableHighlight
            style={{ width: '100%' }}
            onPress={onPress}
            underlayColor={colors.BLUE_GREY.N100}
        >
            <CardSection style={cardSectionStyle}>
                <Image
                    style={imageStyle}
                    source={image}
                    resizeMode="contain"
                />
                <Text style={[fonts.BIG, { marginLeft: 20 }]}>
                    {label}
                </Text>
            </CardSection>
        </TouchableHighlight >
    );
};

const styles = {
    imageStyle: {
        height: 30,
        width: 30,
        tintColor: colors.BLUE_GREY.N500
    },
    cardSectionStyle: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20
    }
};

export { UserAccountMenuItem };
