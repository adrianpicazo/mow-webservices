import {
    ORDER_ADD_RESTAURANT,
    ORDER_RESET,
    ORDER_ADD_PRODUCT,
    ORDER_REMOVE_PRODUCT,
    ORDER_ADDRESS_ADDITION,
    ORDER_ADDRESS_FORM_RESET,
    ORDER_ADDRESS_FORM_CHANGE,
    ORDER_ADDRESS_FORM_FAILURE
} from './types';

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

export const orderAddressFormReset = (address) => {
    return {
        type: ORDER_ADDRESS_FORM_RESET,
        payload: address
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
