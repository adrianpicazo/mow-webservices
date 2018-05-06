import axios from 'axios';
import {
    ADDRESS_FORM_RESET,
    ADDRESS_FORM_CHANGE,
    ADDRESS_FORM_ERROR,
    ADDRESS_ADD_START,
    ADDRESS_ADD_SUCCESS,
    ADDRESS_ADD_FAILURE,
    ADDRESSES_FETCH_START,
    ADDRESSES_FETCH_SUCCESS,
    ADDRESSES_FETCH_FAILURE,
    ADDRESS_REMOVE_FAILURE,
    ADDRESS_REMOVE_START,
    ADDRESS_REMOVE_SUCCESS
} from './types';
import { URL } from '../components/webservices/Request';

export const addressFormReset = () => {
    return {
        type: ADDRESS_FORM_RESET
    };
};

export const addressFormChange = ({ prop, value }) => {
    return {
        type: ADDRESS_FORM_CHANGE,
        payload: { prop, value }
    };
};

export const addressFormError = (error) => {
    return {
        type: ADDRESS_FORM_ERROR,
        payload: error
    };
};

export const addressesFetch = (token) => {
    return (dispatch) => {
        dispatch({ type: ADDRESSES_FETCH_START });

        const config = {
            headers: {
                Token: token
            }
        };

        axios.get(URL.concat('addresses'), config)
            .then(userResponse => {
                const { addresses } = userResponse.data;

                dispatch({
                    type: ADDRESSES_FETCH_SUCCESS,
                    payload: addresses
                });
            })
            .catch(error => {
                dispatch({
                    type: ADDRESSES_FETCH_FAILURE,
                    payload: error.message
                });
            });
    };
};

export const addressAdd = (token, address) => {
    return (dispatch) => {
        dispatch({ type: ADDRESS_ADD_START });

        const data = {
            address
        };

        const config = {
            headers: {
                Token: token
            }
        };

        axios.post(URL.concat('address/new'), data, config)
            .then(userResponse => {
                const { addresses } = userResponse.data;

                dispatch({
                    type: ADDRESS_ADD_SUCCESS,
                    payload: addresses
                });
            })
            .catch(error => {
                dispatch({
                    type: ADDRESS_ADD_FAILURE,
                    payload: error.message
                });
            });
    };
};

export const addressRemove = (token, address) => {
    return (dispatch) => {
        dispatch({ type: ADDRESS_REMOVE_START });

        const config = {
            headers: {
                Token: token
            }
        };

        axios.delete(URL.concat(`address/delete/${address.id}`), config)
            .then(userResponse => {
                const { addresses } = userResponse.data;

                dispatch({
                    type: ADDRESS_REMOVE_SUCCESS,
                    payload: addresses
                });
            })
            .catch(error => {
                dispatch({
                    type: ADDRESS_REMOVE_FAILURE,
                    payload: error.message
                });
            });
    };
};
