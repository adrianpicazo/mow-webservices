import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { CardSection } from '../../common';
import { fonts } from '../../../res/Fonts';
import { colors } from '../../../res/Colors';

const UserAccountOrderItem = ({ order, onPress }) => {
    const { cardSectionStyle } = styles;

    const { restaurantName, totalPrice } = order;

    return (
        <TouchableOpacity
            style={{ width: '100%' }}
            onPress={onPress}
            underlayColor={colors.BLUE_GREY.N100}
        >
            <CardSection style={cardSectionStyle}>
                <Text style={fonts.BIG}>
                    {restaurantName}
                </Text>
                <Text style={fonts.BIG}>
                    {totalPrice} €
                </Text>
            </CardSection>
        </TouchableOpacity >
    );
};

const styles = {
    cardSectionStyle: {
        justifyContent: 'space-between',
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 5,
        marginBottom: 5
    }
};

export { UserAccountOrderItem };
