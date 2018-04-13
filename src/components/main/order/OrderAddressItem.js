import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../../common';
import { fonts } from '../../../res/Fonts';
import { colors } from '../../../res/Colors';

const OrderAddressItem = ({ address, onPress }) => {
    const { cardSectionStyle } = styles;

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={onPress}
            underlayColor={colors.BLUE_GREY.N100}
        >
            <CardSection style={cardSectionStyle}>
                <Text style={fonts.BIG}>
                    {address}
                </Text>
            </CardSection>
        </TouchableOpacity >
    );
};

const styles = {
    cardSectionStyle: {
        backgroundColor: colors.BLUE.N100,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 3,
        marginLeft: 5,
        marginRight: 5
    }
};

export { OrderAddressItem };
