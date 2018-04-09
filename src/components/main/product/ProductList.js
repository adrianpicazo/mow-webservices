import React, { Component } from 'react';
import { ListView } from 'react-native';
import ProductListItem from './ProductListItem';
import { Card } from '../../common/index';
import { Warning } from '../../common/FeedbackAlertMessages';

class ProductList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const { products } = this.props;

        if (products !== undefined) {
            this.createDataSource(products);
        }
    }

    createDataSource(products) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(products);
    }

    renderRow(product) {
        return <ProductListItem product={product} />;
    }

    render() {
        const { products } = this.props;

        if (products === undefined) {
            return (
                <Warning>
                    No existen productos para esta categoría.
                </Warning>
            );
        }

        return (
            <Card>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </Card>
        );
    }
}

export default ProductList;
