import React, { Component } from 'react';
import OrderInfoTotal from './OrderInfoTotal';
import OrderInfoOverview from './OrderInfoOverview';
import Header from '../../headers/Header';
import { ScrollTemplate, Template } from '../../common';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import { TR_HEADER_USER_ORDER } from '../../../i18n/constants';

class OrderInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Order Info');
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_USER_ORDER)}
                />

                <ScrollTemplate>
                    <OrderInfoTotal />
                    <OrderInfoOverview />
                </ScrollTemplate>
            </Template>
        );
    }
}

export default OrderInfo;
