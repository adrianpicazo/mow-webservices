import React, { Component } from 'react';
import { ListView } from 'react-native';
import { Card } from '../../common/Card';
import CategoryListItem from './CategoryListItem';
import { Warning } from '../../common/FeedbackAlertMessages';

class CategoryList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        const { categories } = this.props;

        if (categories !== undefined) {
            this.createDataSource(categories);
        }
    }

    createDataSource(categories) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(categories);
    }

    renderRow(category) {
        return <CategoryListItem category={category} />;
    }

    render() {
        const { categories } = this.props;

        if (categories === undefined) {
            return (
                <Warning>
                    No existen categorías de productos para este restaurante.
                </Warning>
            );
        }

        return (
            <Card style={{ flex: 1 }}>
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </Card>
        );
    }
}

export default CategoryList;
