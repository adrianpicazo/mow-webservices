import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { IC_GREY_X_MARK } from '../../res/images/index';

const homeAddress = {
    description: 'Home',
    geometry: {
        location: {
            lat: 39.992845,
            lng: -0.064650
        }
    }
};

class InputPlacesAutocomplete extends Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <GooglePlacesAutocomplete
                placeholder='Búsqueda'
                minLength={2}
                autoFocus={false}
                returnKeyType={'search'}
                listViewDisplayed='auto'
                fetchDetails
                currentLocation
                currentLocationLabel="Ubicación actual"
                nearbyPlacesAPI='GooglePlacesSearch'
                predefinedPlaces={[homeAddress]}
                debounce={200}

                query={{
                    key: 'AIzaSyCDjApcc-OYFxmLa59YhbXaD6bTBrdMIKk',
                    language: 'es',
                    types: '(cities)'
                }}

                styles={{
                    description: {
                        fontWeight: 'bold',
                    },
                    predefinedPlacesDescription: {
                        color: '#1faadb',
                    },
                }}

                renderDescription={(row) => row.description}

                onPress={(data, details = null) => {
                    console.log(data);
                    console.log(details);
                }}

                getDefaultValue={() => {
                    return 'Dirección por defecto';
                }}

                renderLeftButton={() => <Image source={IC_GREY_X_MARK} />}
                renderRightButton={() => <Text>Custom text after the inputg</Text>}
            />
        );
    }

}

const styles = {
    textInputContainer: {
        backgroundColor: 'rgba(0,0,0,0)',
        borderTopWidth: 0,
        borderBottomWidth: 0
    },
    textInput: {
        marginLeft: 0,
        marginRight: 0,
        height: 38,
        color: '#5d5d5d',
        fontSize: 16
    },
    predefinedPlacesDescription: {
        color: '#1faadb'
    },
    description: {
        fontWeight: 'bold'
    }
};

export default InputPlacesAutocomplete;
