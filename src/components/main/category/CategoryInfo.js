import React, { Component } from 'react';
import { Text, FlatList } from 'react-native';
import { Card, CardSection, Template, Warning, HorizontalRule } from '../../common/index';
import OrderBanner from '../order/OrderBanner';
import Header from '../../headers/Header';
import ProductListItem from './ProductListItem';
import { fonts } from '../../../res/Fonts';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import { TR_HEADER_CATEGORY_INFO } from '../../../i18n/constants';

class CategoryInfo extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Category Info');
    }

    renderProductList() {
        const { productListStyle } = styles;
        const { products } = this.props.category;

        if (products === undefined) {
            return (
                <Card>
                    <CardSection>
                        <Warning>
                            No existen productos para esta categoría.
                        </Warning>
                    </CardSection>
                </Card>
            );
        }

        return (
            <FlatList
                data={products}
                renderItem={({ item }) => <ProductListItem product={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={productListStyle}
                ItemSeparatorComponent={() => <HorizontalRule />}
            />
        );
    }

    render() {
        const { cardStyle } = styles;
        const { name } = this.props.category;

        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_CATEGORY_INFO)}
                />

                <OrderBanner />

                <Card style={cardStyle}>
                    <CardSection>
                        <Text style={[fonts.BIG, { padding: 5 }]}>
                            {name.toUpperCase()}
                        </Text>
                    </CardSection>
                </Card>

                {this.renderProductList()}
            </Template>
        );
    }
}

const styles = {
    cardStyle: {
        width: '100%',
        alignItems: 'flex-start',
        paddingTop: 0,
        paddingRight: 10,
        paddingLeft: 10,
        marginBottom: 5
    },
    productListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 0,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 5
    }
};

export default CategoryInfo;
