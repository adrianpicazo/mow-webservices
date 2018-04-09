import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
    ScrollTemplate,
    Template,
    Card,
    CardSection,
    Button,
    HorizontalRule
} from '../../common/index';
import { resetOrder } from '../../../actions/index';
import Header from '../../headers/Header';
import { fonts } from '../../../res/Fonts';

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
        return (
            <CardSection key={index}>
                <Text style={fonts.NORMAL_FONT}>
                    {itemName} {quantity === undefined ? '' : `(${quantity})`}
                </Text>

                {/* Espaciado */}
                <View style={{ flex: 1 }} />

                <Text style={fonts.NORMAL_FONT}>
                    € {itemPrice}
                </Text>
            </CardSection>
        );
    }

    renderRows(items) {
        return items.map(({ name, priceEuros, quantity }, index) =>
            this.renderRow(name, priceEuros, quantity, index));
    }

    renderRule() {
        return (
            <HorizontalRule style={{ width: 275, marginTop: 5, marginBottom: 5 }} />
        );
    }

    render() {
        const { headerTitleContainerStyle, headerTitleTextStyle } = styles;

        const { products, subtotalPrice, otherExpenses, totalPrice, address } = this.props;

        return (
            <Template>
                <Header headerTitle="Tu pedido" />

                <ScrollTemplate>
                    <Card style={headerTitleContainerStyle}>
                        <Text style={headerTitleTextStyle}>
                            PEDIDO REALIZADO{'\n'}CON ÉXITO
                        </Text>
                    </Card>

                    <Card>
                        <CardSection style={{ flexDirection: 'column' }}>
                            <Text style={fonts.BIG_FONT}>
                                DIRECCIÓN
                            </Text>
                            <Text style={fonts.NORMAL_FONT}>
                                {address}
                            </Text>
                        </CardSection>
                    </Card>

                    <Card style={{ margin: 10 }}>
                        <CardSection>
                            <Text style={fonts.HUGE_FONT}>
                                RESUMEN DEL PEDIDO
                            </Text>
                        </CardSection>

                        {this.renderRule()}
                        {this.renderRows(products)}
                        {this.renderRule()}
                        {this.renderRow('SUBTOTAL', subtotalPrice)}
                        {this.renderRows(otherExpenses)}
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
                            <Button onPress={this.onButtonPress}>
                                Volver
                            </Button>
                        </CardSection>
                    </Card>
                </ScrollTemplate>
            </Template>
        );
    }
}

const styles = {
    headerTitleContainerStyle: {
        width: '80%',
        backgroundColor: '#6add91',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 5
    },
    headerTitleTextStyle: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    }
};

const mapStateToProps = ({ order }) => {
    const { products, subtotalPrice, otherExpenses, totalPrice, address } = order;

    return { products, subtotalPrice, otherExpenses, totalPrice, address };
};

export default connect(mapStateToProps, { resetOrder })(OrderDoneOverview);
