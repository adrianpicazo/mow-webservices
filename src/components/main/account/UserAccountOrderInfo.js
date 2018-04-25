import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { OrderDoneOverview } from '../order/OrderDoneOverview';
import Header from '../../headers/Header';
import { ScrollTemplate, Template } from '../../common';
import InputSecure from '../../common/InputSecure';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_HEADER_USER_ORDER_DONE
} from '../../../i18n/constants';

class UserAccountOrderInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('User Account Order Info');
    }

    render() {
        const {
            products,
            subtotalPrice,
            otherExpenses,
            totalPrice,
            address,
            restaurantName
        } = this.props.order;

        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_USER_ORDER_DONE)}
                />

                <ScrollTemplate style={{ paddingTop: 20 }}>
                    <OrderDoneOverview
                        address={address}
                        products={products}
                        otherExpenses={otherExpenses}
                        subtotalPrice={subtotalPrice}
                        totalPrice={totalPrice}
                        restaurantName={restaurantName}
                    />
                </ScrollTemplate>
            </Template>
        );
    }
}

InputSecure.propTypes = {
    orderUid: PropTypes.string,
    order: PropTypes.shape({
        address: PropTypes.string,
        otherExpenses: PropTypes.arrayOf(PropTypes.object),
        products: PropTypes.arrayOf(PropTypes.object),
        restaurantName: PropTypes.string,
        subtotalPrice: PropTypes.double,
        totalPrice: PropTypes.double
    })
};

export default UserAccountOrderInfo;
