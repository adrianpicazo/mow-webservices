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

        this.props.restaurantsFetch();
    }

    renderList() {
        const { flatListStyle } = styles;
        const { restaurants } = this.props;

        return (
            <View style={{ width: '100%', flex: 1 }}>
                <FlatList
                    data={restaurants}
                    renderItem={({ item }) => <RestaurantListItem restaurant={item} />}
                    keyExtractor={(item, index) => index.toString()}
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
            </View>
        );
    }

    render() {
        const { loading } = this.props;

        return (
            <Template key={this.props.language}>
                <Header
                    renderFilterMenuButton
                    renderUserAccountMenuButton
                    headerTitle={I18nUtils.tr(TR_HEADER_RESTAURANT_LIST)}
                />

                {loading ? <Spinner /> : this.renderList()}
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

const mapStateToProps = ({ restaurantListScreen, account }) => {
    const { restaurants, loading, error } = restaurantListScreen;
    const { language } = account;

    return { restaurants, loading, error, language };
};

export default connect(mapStateToProps, { restaurantsFetch })(RestaurantList);
