import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Header from '../../headers/Header';
import { restaurantsFetch } from '../../../actions/index';
import RestaurantListItem from './RestaurantListItem';
import { Template, HorizontalRule } from '../../common';

class RestaurantList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentWillMount() {
        this.props.restaurantsFetch();
    }

    render() {
        const { flatListStyle } = styles;

        return (
            <Template>
                <Header
                    renderFilterMenuButton
                    renderUserAccountMenuButton
                    headerTitle="Restaurantes"
                />

                <FlatList
                    data={this.props.restaurants}
                    renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
                    keyExtractor={item => item.id.toString()}
                    style={flatListStyle}
                    ItemSeparatorComponent={() => <HorizontalRule
                        marginLeft={65}
                        marginRight={30}
                    />}
                />
            </Template>
        );
    }
}

const styles = {
    flatListStyle: {
        position: 'relative',
        width: '100%',
        marginTop: 5,
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 10
    }
};

const mapStateToProps = ({ restaurantListScreen }) => {
    const restaurants = _.map(restaurantListScreen.restaurants, (val, uid) => {
        return { ...val, uid };
    });

    return { restaurants };
};

export default connect(mapStateToProps, { restaurantsFetch })(RestaurantList);
