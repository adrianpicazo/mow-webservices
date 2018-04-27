import _ from 'lodash';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANT_TYPES_FETCH_SUCCESS,
    RESTAURANT_TYPE_ALL_SELECTION,
    RESTAURANT_TYPE_SELECTION,
    RESTAURANT_FILTRATION_BY_TYPE,
    RESTAURANT_MAP_SELECTION,
    RESTAURANT_SELECTION_CHECKED, RESTAURANT_MAP_RESET
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

export const restaurantMapReset = () => {
    return {
        type: RESTAURANT_MAP_RESET
    };
};

export const restaurantMapSelection = (restaurant) => {
    return {
        type: RESTAURANT_MAP_SELECTION,
        payload: restaurant
    };
};

export const checkRestaurantSelection = (resAccessed, resOrdered, resOrderedHasProducts) => {
    const resAccesedExists = resAccessed !== null && resAccessed !== undefined;
    const resOrderedExists = resOrdered !== null && resOrdered !== undefined;

    if (resAccesedExists) {
        if (resOrderedExists && (resAccessed.id !== resOrdered.id) && resOrderedHasProducts)
            Actions.push('orderResetWarning', { restaurant: resAccessed });
        else Actions.push('restaurantInfo', { restaurant: resAccessed });
    }

    return {
        type: RESTAURANT_SELECTION_CHECKED
    };
};
