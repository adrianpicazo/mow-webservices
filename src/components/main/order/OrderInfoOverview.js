import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button, HorizontalRule, IconButton } from '../../common';
import { IC_WHITE_MINUS } from '../../../res/images/index';
import { removeProductFromOrder } from '../../../actions/index';
import { fonts } from '../../../res/Fonts';

class OrderInfoOverview extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderProductRow(itemName, itemPrice, quantity, index) {
        return (
            <CardSection key={index}>
                <IconButton
                    buttonStyle={{ height: 20, width: 20 }}
                    image={IC_WHITE_MINUS}
                    onPress={() => this.props.removeProductFromOrder({
                        prop: 'product',
                        value: { name: itemName, priceEuros: itemPrice }
                    })}
                />
                <Text style={[fonts.NORMAL_FONT, { marginLeft: 8 }]}>
                    {itemName} ({quantity})
                </Text>

                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Text style={fonts.NORMAL_FONT}>
                    € {itemPrice * quantity}
                </Text>
            </CardSection>
        );
    }

    renderExpenseRow(itemName, itemPrice, index) {
        return (
            <CardSection key={index}>
                <Text style={fonts.NORMAL_FONT}>
                    {itemName}
                </Text>

                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Text style={fonts.NORMAL_FONT}>
                    € {itemPrice}
                </Text>
            </CardSection>
        );
    }

    renderProductRows(items) {
        return items.map(({ name, priceEuros, quantity }, index) =>
            this.renderProductRow(name, priceEuros, quantity, index));
    }

    renderExpenseRows(items) {
        return items.map(({ name, priceEuros }, index) =>
            this.renderExpenseRow(name, priceEuros, index));
    }

    renderRule() {
        return (
            <HorizontalRule style={{ width: 275, marginTop: 5, marginBottom: 5 }} />
        );
    }

    renderOverview() {
        const { products, subtotalPrice, otherExpenses, totalPrice } = this.props;

        return (
            <Card style={{ margin: 10 }}>
                <CardSection>
                    <Text style={fonts.HUGE_FONT}>
                        RESUMEN DEL PEDIDO
                    </Text>
                </CardSection>

                {this.renderRule()}
                {this.renderProductRows(products)}
                {this.renderRule()}
                {this.renderExpenseRow('SUBTOTAL', subtotalPrice)}
                {this.renderExpenseRows(otherExpenses)}
                {this.renderRule()}

                <CardSection>
                    <Text style={[fonts.BIG_FONT, { fontWeight: 'bold' }]}>
                        TOTAL
                    </Text>

                    {/* Espaciado */}
                    <View style={{ flex: 1 }} />

                    <Text style={[fonts.BIG_FONT, { fontWeight: 'bold' }]}>
                        € {totalPrice}
                    </Text>
                </CardSection>

                <CardSection style={{ marginTop: 10 }}>
                    <Button onPress={() => Actions.push('orderAddress')}>
                        Realizar pedido
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        if (this.props.numProducts > 0)
            return this.renderOverview();
        return null;
    }
}

const mapStateToProps = ({ order }) => {
    const { products, numProducts, subtotalPrice, otherExpenses, totalPrice } = order;

    return { products, numProducts, subtotalPrice, otherExpenses, totalPrice };
};

export default connect(mapStateToProps, { removeProductFromOrder })(OrderInfoOverview);
