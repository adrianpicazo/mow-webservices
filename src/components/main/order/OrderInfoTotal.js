import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Card, CardSection } from '../../common/index';
import { Button } from '../../common/Buttons';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';

class OrderInfoTotal extends Component {

    constructor(props, context) {
        super(props, context);
    }

    renderEmptyOrder() {
        const { orderCardStyle } = styles;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE_FONT}>
                        PEDIDO VACÍO
                    </Text>
                    <Text style={fonts.NORMAL_FONT}>
                        ELIJA ALGO RICO
                    </Text>
                </CardSection>

                <CardSection>
                    <Button onPress={() => Actions.pop()}>
                        Añadir platos
                    </Button>
                </CardSection>
            </Card>
        );
    }

    renderOrder() {
        const { orderCardStyle } = styles;

        const { numProducts, totalPrice } = this.props;

        return (
            <Card style={orderCardStyle}>
                <CardSection style={{ flexDirection: 'column' }}>
                    <Text style={fonts.HUGE_FONT}>
                        TOTAL DEL PEDIDO
                    </Text>
                    <Text style={fonts.NORMAL_FONT}>
                        {numProducts} PRODUCTOS
                    </Text>
                </CardSection>

                <CardSection>
                    <Text
                        style={{
                            fontSize: 22,
                            color: '#47dd97',
                            fontWeight: 'bold'
                        }}
                    >
                        € {totalPrice}
                    </Text>
                </CardSection>

                <CardSection>
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
        borderWidth: 2,
        borderStyle: 'dotted',
        borderColor: colors.BLUE.N700,
        borderRadius: 5,
        marginTop: 15,
        marginBottom: 10,
        marginRight: 15,
        marginLeft: 15
    }
};

const mapStateToProps = ({ order }) => {
    const { numProducts, totalPrice } = order;

    return { numProducts, totalPrice };
};

export default connect(mapStateToProps, { })(OrderInfoTotal);
