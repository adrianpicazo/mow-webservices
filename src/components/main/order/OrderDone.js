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
import { resetOrder, order } from '../../../actions/index';
import Header from '../../headers/Header';
import { OrderDoneOverview } from './OrderDoneOverview';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_FAILURE_ORDER_1,
    TR_BODY_FAILURE_ORDER_2,
    TR_BODY_FAILURE_ORDER_3,
    TR_BODY_ORDER_SUCCESS,
    TR_BUTTON_BACK_TO_RESTAURANTS,
    TR_HEADER_USER_ORDER,
    TR_TITLE_FAILURE_ORDER
} from '../../../i18n/constants';

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
                        {I18nUtils.tr(TR_BODY_ORDER_SUCCESS).toUpperCase()}
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
                    <Failure title={I18nUtils.tr(TR_TITLE_FAILURE_ORDER)}>
                        {I18nUtils.tr(TR_BODY_FAILURE_ORDER_1)}
                        {'\n\n'}
                        {I18nUtils.tr(TR_BODY_FAILURE_ORDER_2)}
                        {'\n\nERROR: '}
                        ${orderFailure}
                        {'\n\n'}
                        {I18nUtils.tr(TR_BODY_FAILURE_ORDER_3)}
                    </Failure>
                </CardSection>
            </Card>
        );
    }

    render() {
        const { orderLoading, orderSuccess } = this.props;

        return (
            <Template>
                <Header headerTitle={I18nUtils.tr(TR_HEADER_USER_ORDER)} />

                {orderLoading ?
                    <Spinner size="large" />
                    :
                    <ScrollTemplate>
                        {orderSuccess ? this.renderOrderOverview() : this.renderOrderFailure()}

                        <View style={{ flex: 1 }} />

                        <Card>
                            <CardSection style={{ marginTop: 10 }}>
                                <Button onPress={this.onButtonPress}>
                                    {I18nUtils.tr(TR_BUTTON_BACK_TO_RESTAURANTS)}
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

export default connect(mapStateToProps, { resetOrder, order })(OrderDone);
