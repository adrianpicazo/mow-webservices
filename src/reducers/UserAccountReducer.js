import _ from 'lodash';
import {
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    ADDRESS_ADD_SUCCESS,
    ORDER_ADDRESSES_FETCH_SUCCESS,
    ADDRESSES_FETCH_SUCCESS,
    ADDRESS_REMOVE_SUCCESS,
    ORDERS_FETCH_SUCCESS,
    ORDER_SUCCESS, USER_ACCOUNT_FETCH_SUCCESS
} from '../actions/types';
import AsyncStorage, { AUTH_DATA } from '../utils/AsyncStorage';

const INITIAL_STATE = {
    uid: '',
    name: '',
    surnames: '',
    email: '',
    addresses: null,
    orders: null
};

const setUserAccountProps = (state, action) => {
    const newState = { ...state };
    const { uid, name, surnames, email } = action.payload;

    newState.uid = uid;
    newState.name = name;
    newState.surnames = surnames;
    newState.email = email;

    return newState;
};

const setUserAccountAsyncDataStorage = (state, action) => {
    const { uid, name, surnames, email } = action.payload;

    AsyncStorage.set(AUTH_DATA, { uid, name, surnames, email })
        .then(() => {})
        .catch(error => console.log(error));
};

const addOrderToOrders = (state, action) => {
    const newOrder = action.payload;
    const newState = { ...state };

    newState.orders = newState.orders === null ? [newOrder] : _.concat(newState.orders, newOrder);

    return newState;
};


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACCOUNT_FETCH_SUCCESS:
            if (action.payload === null || action.payload === undefined)
                return state;
            return setUserAccountProps(state, action);
        case LOGIN_USER_SUCCESS:
            setUserAccountAsyncDataStorage(state, action);
            return setUserAccountProps(state, action);
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
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
