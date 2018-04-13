import _ from 'lodash';
import {
    USER_ACCOUNT_FETCH_SUCCESS,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    ADDRESS_ADD_SUCCESS,
    ORDER_ADDRESSES_FETCH_SUCCESS,
    ADDRESSES_FETCH_SUCCESS,
    ADDRESS_REMOVE_SUCCESS, ORDERS_FETCH_SUCCESS, ORDER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    token: '',
    name: '',
    surnames: '',
    email: '',
    addresses: null,
    orders: null
};

const setUserAccountProps = (state, action) => {
    const { name, surnames, email } = action.payload;
    const newState = { ...state };

    newState.name = name;
    newState.surnames = surnames;
    newState.email = email;

    return newState;
};

const addOrderToOrders = (state, action) => {
    const newOrder = action.payload;
    const newState = { ...state };

    newState.orders = newState.orders === null ? [newOrder] : _.concat(newState.orders, newOrder);

    return newState;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE, token: action.payload };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case USER_ACCOUNT_FETCH_SUCCESS:
            return setUserAccountProps(state, action);
        case ADDRESSES_FETCH_SUCCESS:
        case ORDER_ADDRESSES_FETCH_SUCCESS:
        case ADDRESS_REMOVE_SUCCESS:
        case ADDRESS_ADD_SUCCESS:
            return { ...state, addresses: action.payload };
        case ORDERS_FETCH_SUCCESS:
            return { ...state, orders: action.payload };
        case ORDER_SUCCESS:
            return addOrderToOrders(state, action);
        default:
            return state;
    }
};
