import React, { Component } from 'react';
//import MapView, { Marker } from 'react-native-maps';
import { View } from 'react-native';
import { Card, CardSection, Button } from '../components/common/index';

const Geolocation = undefined // navigator.geolocation;
let watchId = 0;

class OrderAddressMap extends Component {

    constructor(props, context) {
        super(props, context);
    }

    state = {
        myPosition: { latitude: 0, longitude: 0 }
    };

    componentDidMount() {
        watchId = Geolocation.watchPosition(position => this.setState({
            myPosition: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }
        }), console.log);
    }

    componentWillUnmount() {
        Geolocation.clearWatch(watchId);
        Geolocation.stopObserving();
    }

    render() {
        const {
            cardStyle,
            cardSectionStyle,
            mapViewStyle
        } = styles;

        return (
            <View />
        );
        /**
        return (
            <View style={{ flex: 1 }}>
                <Card style={[cardStyle, { flex: 1 }]}>
                    <CardSection style={[cardSectionStyle, { flex: 1 }]}>
                        <MapView style={mapViewStyle} >
                            <Marker
                                coordinate={this.state.myPosition}
                            />
                        </MapView>
                    </CardSection>

                    <CardSection style={cardSectionStyle}>
                        <Button onPress={() => {}}>
                            Aceptar
                        </Button>
                    </CardSection>
                </Card>
            </View>
        );
         **/
    }
}

const styles = {
    cardStyle: {
        marginBottom: 10
    },
    cardSectionStyle: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        borderBottomWidth: 0,
    },
    mapViewStyle: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderStyle: 'solid',
        borderColor: '#fff'
    }
};

export default OrderAddressMap;
