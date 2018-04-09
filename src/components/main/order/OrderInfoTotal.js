import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import { Button } from '../../common/Buttons';

class OrderInfoTotal extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderEmptyOrder() {
        const {
            orderCardStyle,
            orderTotalSectionStyle,
            orderTotalTextStyle
        } = styles;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={orderTotalSectionStyle}>
                    <Text style={[orderTotalTextStyle, { fontSize: 24 }]}>
                        PEDIDO VACÍO
                    </Text>
                    <Text style={orderTotalTextStyle}>
                        ELIJA ALGO RICO
                    </Text>
                </CardSection>

                <CardSection style={{ borderBottomWidth: 0 }}>
                    <Button onPress={() => Actions.pop()}>
                        Añadir platos
                    </Button>
                </CardSection>
            </Card>
        );
    }

    renderOrder() {
        const {
            orderCardStyle,
            orderTotalSectionStyle,
            orderTotalTextStyle
        } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={orderTotalSectionStyle}>
                    <Text style={[orderTotalTextStyle, { fontSize: 24 }]}>
                        TOTAL DEL PEDIDO
                    </Text>
                    <Text style={orderTotalTextStyle}>
                        {numProducts} PRODUCTOS
                    </Text>
                </CardSection>

                <CardSection style={orderTotalSectionStyle}>
                    <Text
                        style={[orderTotalTextStyle, {
                            fontSize: 22,
                            color: '#47dd97',
                            fontWeight: 'bold'
                        }]}
                    >
                        € {totalPrice}
                    </Text>
                </CardSection>

                <CardSection style={{ borderBottomWidth: 0 }}>
                    <Button onPress={() => Actions.pop()}>
                        Añadir platos
                    </Button>
                </CardSection>
            </Card>
        );
    }

    render() {
        if (this.props.numProducts === 0)
            return this.renderEmptyOrder();
        return this.renderOrder();
    }
}

const styles = {
    orderCardStyle: {
        padding: 10,
        backgroundColor: '#fff'
    },
    orderTotalSectionStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        borderBottomWidth: 0,
    },
    orderTotalTextStyle: {
        fontSize: 12,
        textAlign: 'center'
    }
};

const mapStateToProps = ({ order }) => {
    const { numProducts, totalPrice } = order;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderInfoTotal);
