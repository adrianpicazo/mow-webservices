import _ from 'lodash';
import React from 'react';
import { View, Text } from 'react-native';
import {
    Card,
    CardSection,
    HorizontalRule,
} from '../../common/index';
import { fonts } from '../../../res/Fonts';

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
                        RESUMEN DEL PEDIDO
                    </Text>
                </CardSection>

                {renderRule()}
                {renderRows(products)}
                {renderSpaceRule()}
                {renderRow('SUBTOTAL', subtotalPrice)}
                {renderRows(otherExpenses)}
                {renderSpaceRule()}

                <CardSection>
                    <Text style={[fonts.BIG, { fontWeight: 'bold' }]}>
                        TOTAL
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
                        DIRECCIÓN DE ENVÍO
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
