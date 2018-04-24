import React, { Component } from 'react';
import OrderInfoTotal from './OrderInfoTotal';
import OrderInfoOverview from './OrderInfoOverview';
import Header from '../../headers/Header';
import { ScrollTemplate, Template } from '../../common';
import { analyticsTracker } from '../../../App';

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
                    headerTitle="Tu pedido"
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
