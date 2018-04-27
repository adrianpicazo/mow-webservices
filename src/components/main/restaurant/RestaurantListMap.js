import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import MapView, { Marker } from 'react-native-maps';
import Header from '../../headers/Header';
import { Card, Template } from '../../common';
import { analyticsTracker } from '../../../App';
import { I18nUtils } from '../../../utils/I18nUtils';
import { TR_BODY_GOTO, TR_HEADER_RESTAURANT_LIST_MAP } from '../../../i18n/constants';
import { colors } from '../../../res/Colors';
import { fonts } from '../../../res/Fonts';
import {
    restaurantMapReset,
    restaurantMapSelection,
    checkRestaurantSelection
} from '../../../actions';

class RestaurantListMap extends Component {

    constructor(props, context) {
        super(props, context);

        this.onLinkPress = this.onLinkPress.bind(this);
    }

    componentWillMount() {
        this.props.restaurantMapReset();
    }

    componentDidMount() {
        analyticsTracker.trackScreenView('Restaurant List Map');
    }

    onLinkPress(mapRestaurantSelected) {
        const { restaurantSelected, numProducts } = this.props;

        this.props.checkRestaurantSelection(
            mapRestaurantSelected, restaurantSelected, numProducts > 0);
    }

    renderMarkers() {
        const { restaurants } = this.props;

        return _.map(restaurants, (mapRes, index) => {
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

const mapStateToProps = ({ restaurantMap, userOrder }) => {
    const { mapRestaurantSelected } = restaurantMap;
    const { restaurantSelected, numProducts } = userOrder;

    return { mapRestaurantSelected, restaurantSelected, numProducts };
};

export default connect(mapStateToProps, {
    restaurantMapReset,
    restaurantMapSelection,
    checkRestaurantSelection
})(RestaurantListMap);
