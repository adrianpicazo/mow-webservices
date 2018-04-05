import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Card, CardSection, Button } from '../../common/index';
import { resetOrder } from '../../../actions/index';
import Header from '../../headers/Header';

class OrderDoneOverview extends Component {

    constructor(props, context) {
        super(props, context);

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    onButtonPress() {
        this.props.resetOrder();

        Actions.main({});
    }

    renderRow(itemName, itemPrice, quantity, index) {
        const {
            overviewTextContainerStyle,
            overviewTextStyle,
        } = styles;

        return (
            <View key={index} style={overviewTextContainerStyle}>
                <Text style={overviewTextStyle}>
                    {itemName} {quantity === undefined ? '' : `(${quantity})`}
                </Text>
                <Text style={overviewTextStyle}>
                    € {itemPrice}
                </Text>
            </View>
        );
    }

    renderRows(items) {
        return items.map(({ name, priceEuros, quantity }, index) =>
            this.renderRow(name, priceEuros, quantity, index));
    }

    render() {
        const {
            cardStyle,
            cardSectionStyle,
            headerTitleContainerStyle,
            headerTitleTextStyle,
            headerSubtitleTextStyle,
            overviewSectionStyle,
            overviewTitleStyle,
            overviewTotalTextStyle,
            overviewTextContainerStyle,
            horizontalRuleStyle
        } = styles;

        const {
            products,
            subtotalPrice,
            otherExpenses,
            totalPrice,
            address
        } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <Header headerTitle="Tu pedido" />

                <ScrollView style={{ flex: 1 }}>
                    <Card style={[cardStyle, { backgroundColor: '#6add91' }]}>
                        <View style={headerTitleContainerStyle}>
                            <Text style={headerTitleTextStyle}>
                                PEDIDO REALIZADO{'\n'}CON ÉXITO
                            </Text>
                        </View>
                    </Card>

                    <Card style={cardStyle}>
                        <CardSection style={cardSectionStyle}>
                            <Text style={headerSubtitleTextStyle}>
                                {`DIRECCIÓN\n${address}`}
                            </Text>
                        </CardSection>
                    </Card>

                    <Card style={cardStyle}>
                        <CardSection style={overviewSectionStyle}>
                            <Text style={overviewTitleStyle}>
                                RESUMEN DEL PEDIDO
                            </Text>
                        </CardSection>

                        <View style={horizontalRuleStyle} />

                        <CardSection style={overviewSectionStyle}>
                            {this.renderRows(products)}
                        </CardSection>

                        <View style={horizontalRuleStyle} />

                        <CardSection style={overviewSectionStyle}>
                            {this.renderRow('SUBTOTAL', subtotalPrice)}
                            {this.renderRows(otherExpenses)}
                        </CardSection>

                        <View style={horizontalRuleStyle} />

                        <CardSection style={overviewSectionStyle}>
                            <View style={overviewTextContainerStyle}>
                                <Text style={overviewTotalTextStyle}>TOTAL</Text>
                                <Text style={overviewTotalTextStyle}>€ {totalPrice}</Text>
                            </View>
                        </CardSection>

                        <CardSection style={[overviewSectionStyle, { marginTop: 5 }]}>
                            <Button onPress={this.onButtonPress}>Volver</Button>
                        </CardSection>
                    </Card>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    cardStyle: {
        flex: 1,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#fff'
    },
    cardSectionStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: 0,
    },
    headerTitleContainerStyle: {
        flex: 1,
        width: '100%',
        backgroundColor: '#6add91',
        borderRadius: 10
    },
    headerTitleTextStyle: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    },
    headerSubtitleTextStyle: {
        width: '100%',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20
    },
    overviewTitleStyle: {
        fontSize: 22
    },
    overviewTextStyle: {
        fontSize: 14
    },
    overviewTotalTextStyle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    overviewTextContainerStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 5,
    },
    overviewSectionStyle: {
        flexDirection: 'column',
        borderBottomWidth: 0
    },
    horizontalRuleStyle: {
        backgroundColor: '#dddddd',
        height: 2
    }
};

const mapStateToProps = ({ order }) => {
    const { products, subtotalPrice, otherExpenses, totalPrice, address } = order;

    return { products, subtotalPrice, otherExpenses, totalPrice, address };
};

export default connect(mapStateToProps, { resetOrder })(OrderDoneOverview);
