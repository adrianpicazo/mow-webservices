import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import OrderInfoTotal from './OrderInfoTotal';
import OrderInfoOverview from './OrderInfoOverview';
import Header from '../../headers/Header';

class OrderInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Header
                    renderBackButton
                    headerTitle="Tu pedido"
                />

                <ScrollView style={{ flex: 1 }}>
                    <OrderInfoTotal />
                    <OrderInfoOverview />
                </ScrollView>
            </View>
        );
    }
}

export default OrderInfo;
