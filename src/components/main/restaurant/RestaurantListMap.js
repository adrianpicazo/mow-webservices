import _ from 'lodash';
import React, { Component } from 'react';
import { Text, TouchableOpacity, Animated } from 'react-native';
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

type RestaurantListMapProps = {
    restaurants: any[]
}

class RestaurantListMap extends Component<RestaurantListMapProps, { fadeAnim: any }> {

    constructor(props, context) {
        super(props, context);
        this.onLinkPress = this.onLinkPress.bind(this);
    }

    state = {
        fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
    };

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

    onMarkerClick = () => {
        Animated.timing(                  // Animate over time
            this.state.fadeAnim,            // The animated value to drive
            {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,              // Make it take a while
            }
        )
            .start();
    };

    renderMarkers() {
        const { restaurants } = this.props;

        return _.map(restaurants, (mapRes, index) => {
            const { position } = mapRes;

            if (position !== undefined) {
                return (<Marker
                    key={index}
                    title={mapRes.name}
                    coordinate={mapRes.position}
                    onPress={() => {
                        this.props.restaurantMapSelection(mapRes);
                        this.onMarkerClick();
                    }}
                />);
            }
        });
    }

    renderRestaurantLink() {
        const { viewStyle, touchableOpacityStyle } = styles.restaurantLinkStyle;
        const { mapRestaurantSelected } = this.props;

        if (mapRestaurantSelected !== null && mapRestaurantSelected !== undefined) {
            return (
                <Animated.View style={[viewStyle, { opacity: this.state.fadeAnim }]}>
                    <TouchableOpacity
                        onPress={() => this.onLinkPress(mapRestaurantSelected)}
                        style={touchableOpacityStyle}
                    >
                        <Text style={[fonts.BIG, { color: colors.WHITE }]}>
                            {I18nUtils.tr(TR_BODY_GOTO)
                                .concat(mapRestaurantSelected.name)}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
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
                        latitude: 39.980000,
                        longitude: -0.050000,
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
        viewStyle: {
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            bottom: 20,
            right: 20,
            left: 20,
            height: 40
        },
        touchableOpacityStyle: {
            backgroundColor: colors.BLUE.N700,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 5,
            elevation: 8,
            shadowColor: colors.BLACK,
            shadowOpacity: 0.4,
            shadowOffset: {
                width: 1,
                height: 5,
            }
        }
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
