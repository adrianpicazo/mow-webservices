import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import { restaurantsFetch } from '../../../actions/index';
import RestaurantListItem from './RestaurantListItem';
import { BaseTemplate } from '../../common';

class RestaurantList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.restaurantsFetch();

        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        // nextProps are the next set of props that this component will be rendered with
        // this.props is still the old set of props

        this.createDataSource(nextProps);
    }

    createDataSource({ restaurants }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(restaurants);
    }

    renderRow(restaurant) {
        return <RestaurantListItem restaurant={restaurant} />;
    }

    render() {
        return (
            <BaseTemplate>
                <Header
                    renderFilterMenuButton
                    renderUserAccountMenuButton
                    headerTitle="Restaurantes"
                />

                <ListView
                    style={{ flex: 1, marginBottom: 5 }}
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            </BaseTemplate>
        );
    }
}

const mapStateToProps = ({ restaurantListScreen }) => {
    const restaurants = _.map(restaurantListScreen.restaurants, (val, uid) => {
        return { ...val, uid };
    });

    return { restaurants };
};

export default connect(mapStateToProps, { restaurantsFetch })(RestaurantList);
