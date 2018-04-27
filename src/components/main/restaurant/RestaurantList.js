import _ from 'lodash';
import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import { restaurantsFetch } from '../../../actions/index';
import RestaurantListItem from './RestaurantListItem';
import { Template, HorizontalRule, FloatingButton } from '../../common';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import { TR_HEADER_RESTAURANT_LIST } from '../../../i18n/constants';
import { IC_BLACK_WORLDWIDE_LOCATION } from '../../../res/images';

class RestaurantList extends Component {

    constructor(props, context) {
        super(props, context);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Restaurant List');

        const { restaurantsFetched } = this.props;

        if (!restaurantsFetched)
            this.props.restaurantsFetch();
    }

    render() {
        const { flatListStyle } = styles;
        const { restaurants } = this.props;

        return (
            <Template>
                <Header
                    renderFilterMenuButton
                    renderUserAccountMenuButton
                    headerTitle={I18nUtils.tr(TR_HEADER_RESTAURANT_LIST)}
                />

                <FlatList
                    data={restaurants}
                    renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
                    keyExtractor={item => item.id.toString()}
                    style={flatListStyle}
                    ItemSeparatorComponent={() => <HorizontalRule
                        marginLeft={65}
                        marginRight={30}
                    />}
                />

                <FloatingButton
                    onPress={() => Actions.push('restaurantListMap', { restaurants })}
                    image={IC_BLACK_WORLDWIDE_LOCATION}
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
    const { restaurantsFetched } = restaurantListScreen;
    const restaurants = _.map(restaurantListScreen.restaurants, (val, uid) => {
        return { ...val, uid };
    });

    return { restaurants, restaurantsFetched };
};

export default connect(mapStateToProps, { restaurantsFetch })(RestaurantList);
