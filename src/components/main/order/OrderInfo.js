import React, { Component } from 'react';
import OrderInfoTotal from './OrderInfoTotal';
import OrderInfoOverview from './OrderInfoOverview';
import Header from '../../headers/Header';
import { ScrollTemplate, Template } from '../../common';

class OrderInfo extends Component {

    constructor(props, context) {
        super(props, context);
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
