import _ from 'lodash';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANT_TYPES_FETCH_SUCCESS,
    RESTAURANT_TYPE_ALL_SELECTION,
    RESTAURANT_TYPE_SELECTION,
    RESTAURANT_FILTRATION_BY_TYPE,
    RESTAURANT_SETTING_MAP_SUCCESS,
    RESTAURANT_SETTING_MAP_FAILURE,
    RESTAURANT_MAP_SELECTION
} from './types';

// TODO: vigilar los errores como con las direcciones
export const restaurantsFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/restaurants')
            .on('value', snapshot => {
                dispatch({
                    type: RESTAURANTS_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};

export const restaurantTypesFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/types')
            .once('value', snapshot => {
                dispatch({
                    type: RESTAURANT_TYPES_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};

export const restaurantTypeSelection = (name) => {
    return {
        type: RESTAURANT_TYPE_SELECTION,
        payload: name
    };
};

export const restaurantTypeAllSelection = (value) => {
    return {
        type: RESTAURANT_TYPE_ALL_SELECTION,
        payload: value
    };
};

export const restaurantFiltrationByType = (restaurantTypesSelected) => {
    return (dispatch) => {
        firebase.database().ref('/restaurants')
            .on('value', snapshot => {
                dispatch({
                    type: RESTAURANT_FILTRATION_BY_TYPE,
                    payload: typeFilter(snapshot.val(), restaurantTypesSelected)
                });
            });
    };
};

const typeFilter = (restaurants, restaurantTypesSelected) => {
   return _.filter(restaurants, rest => restaurantTypesSelected.includes(rest.type));
};

export const restaurantMap = (restaurants) => {
    try {
        Actions.push('restaurantListMap');

        const mapRestaurants = _.map(restaurants, res => {
            return { rid: res.id, name: res.name, position: res.position };
        });

        return {
            type: RESTAURANT_SETTING_MAP_SUCCESS,
            payload: mapRestaurants
        };
    } catch (error) {
        console.warn(error);

        return {
            type: RESTAURANT_SETTING_MAP_FAILURE,
            payload: error.message
        };
    }
};

export const restaurantMapSelection = (restaurant) => {
    return {
        type: RESTAURANT_MAP_SELECTION,
        payload: restaurant
    };
};
