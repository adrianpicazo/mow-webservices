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
    Failure,
    Spinner
} from '../../common/index';
import { resetOrder, order, restaurantFetch } from '../../../actions/index';
import Header from '../../headers/Header';
import { OrderDoneOverview } from './OrderDoneOverview';
import { analyticsTracker } from '../../../App';

class OrderDone extends Component {

    constructor(props, context) {
        super(props, context);

        this.onButtonPress = this.onButtonPress.bind(this);
    }

    componentWillMount() {
        const {
            uid,
            restaurantName,
            products,
            subtotalPrice,
            otherExpenses,
            totalPrice,
            address
        } = this.props;

        this.props.order(uid, {
            products, subtotalPrice, otherExpenses, totalPrice, address, restaurantName
        });
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Order Done');
    }

    onButtonPress() {
        this.props.resetOrder();

        Actions.push('restaurantList');
    }

    renderOrderOverview() {
        const { headerTitleContainerStyle, headerTitleTextStyle } = styles;

        const {
            products,
            subtotalPrice,
            otherExpenses,
            totalPrice,
            address,
            restaurantName
        } = this.props;

        return (
            <View style={{ width: '100%' }}>
                <Card style={headerTitleContainerStyle}>
                    <Text style={headerTitleTextStyle}>
                        PEDIDO REALIZADO{'\n'}CON ÉXITO
                    </Text>
                </Card>

                <OrderDoneOverview
                    address={address}
                    products={products}
                    otherExpenses={otherExpenses}
                    subtotalPrice={subtotalPrice}
                    totalPrice={totalPrice}
                    restaurantName={restaurantName}
                />
            </View>
        );
    }

    renderOrderFailure() {
        const { orderFailure } = this.props;

        return (
            <Card>
                <CardSection>
                    <Failure title={'FALLO EN EL PEDIDO'}>
                        {`¡Lo sentimos mucho!\n\nSe ha producido un fallo en el pedido.
                        \nERROR: ${orderFailure}\n\nRealice el pedido de nuevo.`}
                    </Failure>
                </CardSection>
            </Card>
        );
    }

    render() {
        const { orderLoading, orderSuccess } = this.props;

        return (
            <Template>
                <Header headerTitle="Tu pedido" />

                {orderLoading ?
                    <Spinner size="large" />
                    :
                    <ScrollTemplate>
                        {orderSuccess ? this.renderOrderOverview() : this.renderOrderFailure()}

                        <View style={{ flex: 1 }} />

                        <Card>
                            <CardSection style={{ marginTop: 10 }}>
                                <Button onPress={this.onButtonPress}>
                                    Volver
                                </Button>
                            </CardSection>
                        </Card>
                    </ScrollTemplate>
                }
            </Template>
        );
    }
}

const styles = {
    headerTitleContainerStyle: {
        backgroundColor: '#6add91',
        borderRadius: 5,
        marginTop: 20,
        marginBottom: 5,
        marginLeft: 20,
        marginRight: 20
    },
    headerTitleTextStyle: {
        width: '100%',
        fontSize: 24,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: 'bold'
    }
};

const mapStateToProps = ({ account, userOrder, orderDone }) => {
    const { orderLoading, orderSuccess, orderFailure } = orderDone;
    const { products, subtotalPrice, otherExpenses, totalPrice, address } = userOrder;
    const { uid } = account;

    const restaurantName =
        userOrder.restaurantSelected == null ? '' : userOrder.restaurantSelected.name;

    return {
        uid,
        restaurantName,
        products,
        subtotalPrice,
        otherExpenses,
        totalPrice,
        address,
        orderLoading,
        orderSuccess,
        orderFailure
    };
};

export default connect(mapStateToProps, { resetOrder, order, restaurantFetch })(OrderDone);
