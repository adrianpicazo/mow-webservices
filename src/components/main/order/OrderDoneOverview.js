import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import {
    Card,
    CardSection,
    HorizontalRule,
} from '../../common/index';
import { fonts } from '../../../res/Fonts';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_ORDER_SUBTOTAL,
    TR_BODY_ORDER_SUMMARY,
    TR_BODY_ORDER_TOTAL,
    TR_BODY_ORDER_SHIPPING_ADDRESS,
} from '../../../i18n/constants';

const renderRow = (itemName, itemPrice, quantity, index) => {
    return (
        <CardSection key={index}>
            <Text style={fonts.NORMAL}>
                {itemName} {quantity === undefined ? '' : `(${quantity})`}
            </Text>

            {/* Espaciado */}
            <View style={{ flex: 1 }} />

            <Text style={fonts.NORMAL}>
                € {itemPrice}
            </Text>
        </CardSection>
    );
};

const renderRows = (items) => {
    return _.map(items,
        ({ name, priceEuros, quantity }, index) => renderRow(name, priceEuros, quantity, index)
    );
};

const renderRule = () => {
    return (
        <HorizontalRule style={{ width: 275, marginTop: 5, marginBottom: 5 }} />
    );
};

const renderSpaceRule = () => {
    return (
        <HorizontalRule style={{ width: 0, marginTop: 5, marginBottom: 5 }} />
    );
};

const OrderDoneOverview = ({ restaurantName, address, products, otherExpenses, subtotalPrice,
                               totalPrice }) => {
    return (
        <View style={{ width: '100%' }}>
            <Card>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.BIG}>
                        {restaurantName}
                    </Text>
                </CardSection>
            </Card>

            <Card style={{ margin: 10 }}>
                <CardSection>
                    <Text style={fonts.HUGE}>
                        {I18nUtils.tr(TR_BODY_ORDER_SUMMARY).toUpperCase()}
                    </Text>
                </CardSection>

                {renderRule()}
                {renderRows(products)}
                {renderSpaceRule()}
                {renderRow(I18nUtils.tr(TR_BODY_ORDER_SUBTOTAL).toUpperCase(), subtotalPrice)}
                {renderRows(otherExpenses)}
                {renderSpaceRule()}

                <CardSection>
                    <Text style={[fonts.BIG, { fontWeight: 'bold' }]}>
                        {I18nUtils.tr(TR_BODY_ORDER_TOTAL).toUpperCase()}
                    </Text>

                    {/* Espaciado */}
                    <View style={{ flex: 1 }} />

                    <Text style={[fonts.BIG, { fontWeight: 'bold' }]}>
                        € {totalPrice}
                    </Text>
                </CardSection>
            </Card>

            <Card>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE}>
                        {I18nUtils.tr(TR_BODY_ORDER_SHIPPING_ADDRESS).toUpperCase()}
                    </Text>
                </CardSection>

                {renderRule()}

                <CardSection>
                    <Text style={[fonts.NORMAL, { textAlign: 'center' }]}>
                        {address}
                    </Text>
                </CardSection>
            </Card>
        </View>
    );
};

export { OrderDoneOverview };
