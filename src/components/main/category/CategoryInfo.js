import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardSection, BaseTemplate } from '../../common/index';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import ProductList from '../product/ProductList';

class CategoryInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const {
            headerContentStyle,
            headerTextStyle
        } = styles;

        const { name, products } = this.props.category;

        return (
            <BaseTemplate>
                <Header
                    renderBackButton
                    headerTitle="Productos"
                />

                <OrderBanner />

                <Card>
                    <CardSection>
                        <View style={headerContentStyle}>
                            <Text style={headerTextStyle}>
                                {name}
                            </Text>
                        </View>
                    </CardSection>
                </Card>

                <ProductList products={products} />
            </BaseTemplate>
        );
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18,
        padding: 5
    }
};

export default CategoryInfo;
