import _ from 'lodash';
import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    ORDER_ADD_RESTAURANT,
    ORDER_RESET,
    ORDER_ADD_PRODUCT,
    ORDER_REMOVE_PRODUCT,
    ORDER_ADDRESS_ADDITION,
    ORDER_ADDRESS_FORM_RESET,
    ORDER_ADDRESS_FORM_CHANGE,
    ORDER_ADDRESS_FORM_FAILURE,
    ORDER_ADDRESSES_FETCH_START,
    ORDER_ADDRESSES_FETCH_SUCCESS,
    ORDER_ADDRESSES_FETCH_FAILURE,
    ORDER_START,
    ORDER_SUCCESS,
    ORDER_FAILURE,
    ORDERS_FETCH_START,
    ORDERS_FETCH_SUCCESS,
    ORDERS_FETCH_FAILURE,
} from './types';
import { I18nUtils } from '../utils/I18nUtils';
import { TR_ERROR_NO_DATA } from '../i18n/constants';

export const addRestaurantToOrder = (restaurant) => {
    return {
        type: ORDER_ADD_RESTAURANT,
        payload: restaurant
    };
};

export const resetOrder = () => {
    return {
        type: ORDER_RESET,
        payload: null
    };
};

export const addProductToOrder = (product) => {
    return {
        type: ORDER_ADD_PRODUCT,
        payload: product
    };
};

export const removeProductFromOrder = (product) => {
    return {
        type: ORDER_REMOVE_PRODUCT,
        payload: product
    };
};

export const orderAddressAddition = (address) => {
    return {
        type: ORDER_ADDRESS_ADDITION,
        payload: address
    };
};

export const orderAddressFormReset = () => {
    return {
        type: ORDER_ADDRESS_FORM_RESET
    };
};

export const orderAddressFormChange = ({ prop, value }) => {
    return {
        type: ORDER_ADDRESS_FORM_CHANGE,
        payload: { prop, value }
    };
};

export const orderAddressFormFailure = (error) => {
    return {
        type: ORDER_ADDRESS_FORM_FAILURE,
        payload: error
    };
};

export const orderAddressesFetch = (uid) => {
    return (dispatch) => {
        dispatch({ type: ORDER_ADDRESSES_FETCH_START });

        try {
            firebase.database()
                .ref(`/users/${uid}/addresses`)
                .on('value', snapshot => {
                    if (snapshot.exists()) {
                        dispatch({
                            type: ORDER_ADDRESSES_FETCH_SUCCESS,
                            payload: snapshot.val()
                        });
                    } else {
                        dispatch({
                            type: ORDER_ADDRESSES_FETCH_FAILURE,
                            payload: I18nUtils.tr(TR_ERROR_NO_DATA)
                        });
                    }
                });
        } catch (error) {
            dispatch({
                type: ORDER_ADDRESSES_FETCH_FAILURE,
                payload: error.message
            });
        }
    };
};

export const order = (uid, newOrder) => {
    const {
        products,
        subtotalPrice,
        otherExpenses,
        totalPrice,
        address,
        restaurantName
    } = newOrder;

    return (dispatch) => {
        dispatch({ type: ORDER_START });

        firebase.database()
            .ref(`/users/${uid}/orders`)
            .push({ products, subtotalPrice, otherExpenses, totalPrice, address, restaurantName })
            .then(() => {
                dispatch({
                    type: ORDER_SUCCESS,
                    payload: newOrder
                });
            })
            .catch(error => {
                dispatch({
                    type: ORDER_FAILURE,
                    payload: error.message
                });
            });

        Actions.push('orderDoneOverview');
    };
};

export const ordersFetch = (uid) => {
    return (dispatch) => {
        dispatch({ type: ORDERS_FETCH_START });

        try {
            firebase.database()
                .ref(`/users/${uid}/orders`)
                .on('value', snapshot => {
                    const orders = _.map(_.forEach(snapshot.val(), item => { return item; }));

                    dispatch({
                        type: ORDERS_FETCH_SUCCESS,
                        payload: orders
                    });
                });
        } catch (error) {
            dispatch({
                type: ORDERS_FETCH_FAILURE,
                payload: error.message
            });
        }
    };
};
