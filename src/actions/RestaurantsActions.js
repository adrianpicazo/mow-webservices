import _ from 'lodash';
import firebase from 'react-native-firebase';
import {
    RESTAURANT_SELECTION,
    RESTAURANT_ITEM_SELECTION,
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANT_TYPES_FETCH_SUCCESS,
    RESTAURANT_TYPE_ALL_SELECTION,
    RESTAURANT_TYPE_SELECTION,
    RESTAURANT_FILTRATION_BY_TYPE
} from './types';

export const selectRestaurant = (restaurantId) => {
    return {
        type: RESTAURANT_SELECTION,
        payload: restaurantId
    };
};

export const restaurantItemSelection = (restaurant) => {
    return {
        type: RESTAURANT_ITEM_SELECTION,
        payload: restaurant
    };
};

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
