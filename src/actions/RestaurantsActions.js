import _ from 'lodash';
import firebase from 'react-native-firebase';
import {
    SELECT_RESTAURANT,
    RESTAURANT_ITEM_SELECTION,
    RESTAURANTS_FETCH_SUCCESS,
    SELECT_ALL_RESTAURANT_TYPES,
    SELECT_RESTAURANT_TYPE,
    FILTER_RESTAURANTS_BY_TYPE
} from './types';

export const selectRestaurant = (restaurantId) => {
    return {
        type: SELECT_RESTAURANT,
        payload: restaurantId
    };
};

export const restaurantItemSelection = (restaurant) => {
    return {
        type: RESTAURANT_ITEM_SELECTION,
        payload: restaurant
    };
};

export const restaurantsFetch = () => {
    return (dispatch) => {
        firebase.database().ref('/restaurants')
            .on('value', snapshot => {
                dispatch({ type: RESTAURANTS_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const selectRestaurantType = ({ prop, value }) => {
    return {
        type: SELECT_RESTAURANT_TYPE,
        payload: { prop, value }
    };
};

export const selectAllRestaurantTypes = (value) => {
    return {
        type: SELECT_ALL_RESTAURANT_TYPES,
        payload: value
    };
};

export const filterRestaurantsByType = (restaurantTypesSelected) => {
    return (dispatch) => {
        firebase.database().ref('/restaurants')
            .on('value', snapshot => {
                dispatch({
                    type: FILTER_RESTAURANTS_BY_TYPE,
                    payload: typeFilter(snapshot.val(), restaurantTypesSelected)
                });
            });
    };
};

const typeFilter = (restaurants, restaurantTypesSelected) => {
   return _.filter(restaurants, rest => restaurantTypesSelected.includes(rest.type));
};
