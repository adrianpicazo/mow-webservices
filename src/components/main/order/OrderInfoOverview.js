import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../../common/index';
import { IC_WHITE_MINUS } from '../../../res/images/index';
import { removeProductFromOrder } from '../../../actions/index';

class OrderInfoOverview extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderProductRow(itemName, itemPrice, quantity, index) {
        const {
            orderOverviewRowStyle,
            orderOverviewTextContainerStyle,
            orderOverviewTextStyle,
            imageContainerStyle,
            imageStyle
        } = styles;

        return (
            <View key={index} style={orderOverviewRowStyle}>
                <TouchableOpacity
                    style={imageContainerStyle}
                    onPress={() => this.props.removeProductFromOrder({
                        prop: 'product',
                        value: { name: itemName, priceEuros: itemPrice }
                    })}
                >
                    <Image
                        style={imageStyle}
                        source={IC_WHITE_MINUS}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
                <View style={orderOverviewTextContainerStyle}>
                    <Text style={orderOverviewTextStyle}>
                        {itemName} ({quantity})
                    </Text>
                    <Text style={orderOverviewTextStyle}>
                        € {itemPrice * quantity}
                    </Text>
                </View>
            </View>
        );
    }

    renderExpenseRow(itemName, itemPrice, index) {
        const {
            orderOverviewTextContainerStyle,
            orderOverviewTextStyle,
        } = styles;

        return (
            <View key={index} style={orderOverviewTextContainerStyle}>
                <Text style={orderOverviewTextStyle}>
                    {itemName}
                </Text>
                <Text style={orderOverviewTextStyle}>
                    € {itemPrice}
                </Text>
            </View>
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

    renderOverview() {
        const {
            orderCardStyle,
            orderOverviewSectionStyle,
            orderOverviewTextContainerStyle,
            orderOverviewTitleStyle,
            orderOverviewTotalTextStyle,
            horizontalRuleStyle
        } = styles;

        const { products, subtotalPrice, otherExpenses, totalPrice } = this.props;

        return (
            <Card style={[orderCardStyle, { flex: 1, marginBottom: 5 }]}>
                <CardSection style={[orderOverviewSectionStyle, { marginTop: 10 }]}>
                    <Button onPress={() => Actions.push('orderAddress')}>
                        Realizar pedido
                    </Button>
                </CardSection>

                <CardSection style={orderOverviewSectionStyle}>
                    <Text style={orderOverviewTitleStyle}>
                        RESUMEN DEL PEDIDO
                    </Text>
                </CardSection>

                <View style={horizontalRuleStyle} />

                <CardSection style={orderOverviewSectionStyle}>
                    {this.renderProductRows(products)}
                </CardSection>

                <View style={horizontalRuleStyle} />

                <CardSection style={orderOverviewSectionStyle}>
                    {this.renderExpenseRow('SUBTOTAL', subtotalPrice)}
                    {this.renderExpenseRows(otherExpenses)}
                </CardSection>

                <View style={horizontalRuleStyle} />

                <CardSection style={orderOverviewSectionStyle}>
                    <View style={orderOverviewTextContainerStyle}>
                        <Text style={orderOverviewTotalTextStyle}>
                            TOTAL
                        </Text>
                        <Text style={orderOverviewTotalTextStyle}>
                            € {totalPrice}
                        </Text>
                    </View>
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

const styles = {
    orderCardStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
    orderOverviewSectionStyle: {
        flexDirection: 'column',
        borderBottomWidth: 0
    },
    orderOverviewRowStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    orderOverviewTextContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    orderOverviewTitleStyle: {
        fontSize: 22
    },
    orderOverviewTextStyle: {
        fontSize: 12
    },
    orderOverviewTotalTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    horizontalRuleStyle: {
        backgroundColor: '#dddddd',
        height: 2
    },
    imageContainerStyle: {
        height: 20,
        width: 20,
        backgroundColor: '#7998ff',
        padding: 5,
        marginRight: 5,
        marginTop: 5,
        marginBottom: 5,
        borderRadius: 5
    },
    imageStyle: {
        flex: 1,
        height: undefined,
        width: undefined,
    }
};

const mapStateToProps = ({ order }) => {
    const { products, numProducts, subtotalPrice, otherExpenses, totalPrice } = order;

    return { products, numProducts, subtotalPrice, otherExpenses, totalPrice };
};

export default connect(mapStateToProps, { removeProductFromOrder })(OrderInfoOverview);
