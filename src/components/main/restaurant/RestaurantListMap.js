import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import Header from '../../headers/Header';
import { Card, Template, Warning } from '../../common';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import {
    TR_BODY_GOTO,
    TR_HEADER_RESTAURANT_LIST_MAP,
    TR_TITLE_FAILURE_OBTAINING_DATA
} from '../../../i18n/constants';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';
import { restaurantMapSelection } from '../../../actions';

class RestaurantListMap extends Component {

    constructor(props, context) {
        super(props, context);

        this.onLinkPress = this.onLinkPress.bind(this);
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Restaurant List Map');
    }

    onLinkPress(mapRestaurantSelected) {
        console.log(mapRestaurantSelected);

        // const restaurant = this.props.restaurant;
        // const restaurantIdSelected = this.props.restaurantSelected == null ? -1 : this.props.restaurantSelected.id;
        // const hasOrderedProducts = this.props.numProducts > 0;
        //
        // if (restaurantIdSelected !== -1 &&
        //     restaurant.id !== restaurantIdSelected &&
        //     hasOrderedProducts) {
        //     Actions.push('orderResetWarning', { restaurant });
        // } else {
        //     Actions.push('restaurantInfo', { restaurant });
        // }
    }

    renderMarkers() {
        const { mapRestaurants } = this.props;

        const markers = _.map(mapRestaurants, (mapRes, index) => {
            const { position } = mapRes;

            if (position !== undefined)
                return (<Marker
                    key={index}
                    title={mapRes.name}
                    coordinate={mapRes.position}
                    onPress={() => {
                        this.props.restaurantMapSelection(mapRes);
                    }}
                />);
        });

        return markers;
    }

    renderRestaurantLink() {
        const { restaurantLinkStyle } = styles;
        const { mapRestaurantSelected } = this.props;

        if (mapRestaurantSelected !== null && mapRestaurantSelected !== undefined) {
            return (
                <TouchableOpacity
                    onPress={() => this.onLinkPress(mapRestaurantSelected)}
                    style={restaurantLinkStyle}
                >
                    <Text style={[fonts.BIG, { color: colors.WHITE }]}>
                        {I18nUtils.tr(TR_BODY_GOTO).concat(mapRestaurantSelected.name)}
                    </Text>
                </TouchableOpacity>
            );
        }
    }

    renderMap() {
        const { mapViewStyle } = styles;
        const { error } = this.props;

        if (error) {
            return (
                <Warning title={I18nUtils.tr(TR_TITLE_FAILURE_OBTAINING_DATA)}>
                    {error}
                </Warning>
            );
        }

        return (
            <Card style={{ width: '100%', height: '100%', padding: 0 }}>
                <MapView
                    style={mapViewStyle}
                    initialRegion={{
                        latitude: 39.985821,
                        longitude: -0.038422,
                        latitudeDelta: 0.0700,
                        longitudeDelta: 0.0700,
                    }}
                >
                    {this.renderMarkers()}
                </MapView>

            </Card>
        );
    }

    render() {
        return (
            <Template>
                <Header
                    renderBackButton
                    headerTitle={I18nUtils.tr(TR_HEADER_RESTAURANT_LIST_MAP)}
                />
                {this.renderMap()}
                {this.renderRestaurantLink()}
            </Template>
        );
    }
}

const styles = {
    mapViewStyle: {
        width: '100%',
        height: '100%'
    },
    restaurantLinkStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: colors.BLUE.N700,
        bottom: 20,
        right: 20,
        left: 20,
        padding: 10,
        height: 40,
        borderRadius: 5,
        elevation: 8,
        shadowColor: colors.BLACK,
        shadowOpacity: 0.4,
        shadowOffset: {
            width: 1,
            height: 5,
        },
    }
};

const mapStateToProps = ({ restaurantMap }) => {
    const { mapRestaurants, mapRestaurantSelected, error } = restaurantMap;

    return { mapRestaurants, mapRestaurantSelected, error };
};

export default connect(mapStateToProps, { restaurantMapSelection })(RestaurantListMap);
