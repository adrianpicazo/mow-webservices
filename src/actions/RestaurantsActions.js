import _ from 'lodash';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    RESTAURANTS_FETCH_START,
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANTS_FETCH_FAILURE,
    RESTAURANT_TYPES_FETCH_START,
    RESTAURANT_TYPES_FETCH_FAILURE,
    RESTAURANT_TYPES_FETCH_SUCCESS,
    RESTAURANT_TYPE_ALL_SELECTION,
    RESTAURANT_TYPE_SELECTION,
    RESTAURANT_MAP_SELECTION,
    RESTAURANT_SELECTION_CHECKED,
    RESTAURANT_MAP_RESET
} from './types';
import { URL } from '../components/webservices/Request';

export const restaurantsFetch = () => {
    return (dispatch) => {
        dispatch({ type: RESTAURANTS_FETCH_START });

        let restaurantListURL = URL.concat('list?pc=12000&category=');
        _.forEach(restaurantTypes, restaurantType => {
            restaurantListURL += restaurantType.toString().concat('/');
        });

        axios.get(restaurantListURL)
            .then(userResponse => {
                const { restaurants } = userResponse.data;
                const restaurantList = _.map(restaurants, rest => rest);

                dispatch({
                    type: RESTAURANTS_FETCH_SUCCESS,
                    payload: restaurantList
                });
            })
            .catch(error => {
                dispatch({
                    type: RESTAURANTS_FETCH_FAILURE,
                    payload: error.message
                });
            });
    };
};

export const restaurantTypesFetch = () => {
    return (dispatch) => {
        dispatch({ type: RESTAURANT_TYPES_FETCH_START });

        axios.get(URL.concat('types'))
            .then(userResponse => {
                const { categories } = userResponse.data;

                dispatch({
                    type: RESTAURANT_TYPES_FETCH_SUCCESS,
                    payload: categories
                });
            })
            .catch(error => {
                dispatch({
                    type: RESTAURANT_TYPES_FETCH_FAILURE,
                    payload: error.message
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
