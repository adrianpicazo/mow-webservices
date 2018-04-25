import _ from 'lodash';
import firebase from 'react-native-firebase';
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
import { I18nUtils } from '../utils/I18nUtils';
import { TR_ERROR_NO_DATA, TR_ERROR_REPEATED_ADDRESS } from '../i18n/constants';

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

export const addressesFetch = (uid) => {
    return (dispatch) => {
        dispatch({ type: ADDRESSES_FETCH_START });

        try {
            firebase.database()
                .ref(`/users/${uid}/addresses`)
                .on('value', snapshot => {
                    if (snapshot.exists()) {
                        dispatch({
                            type: ADDRESSES_FETCH_SUCCESS,
                            payload: snapshot.val()
                        });
                    } else {
                        dispatch({
                            type: ADDRESSES_FETCH_FAILURE,
                            payload: I18nUtils.tr(TR_ERROR_NO_DATA)
                        });
                    }
                });
        } catch (error) {
            dispatch({
                type: ADDRESSES_FETCH_FAILURE,
                payload: error.message
            });
        }
    };
};

export const addressAdd = (uid, addressList, address) => {
    let addresses;

    if (addressList !== null) {
        if (_.find(addressList, item => { return item === address; })) {
            return {
                type: ADDRESS_ADD_FAILURE,
                payload: I18nUtils.tr(TR_ERROR_REPEATED_ADDRESS)
            };
        }
        addresses = _.concat(addressList, address);
    } else {
        addresses = [address];
    }

    return (dispatch) => {
        dispatch({ type: ADDRESS_ADD_START });

        firebase.database().ref(`/users/${uid}`)
            .update({ addresses })
            .then(() => {
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

export const addressRemove = (uid, addressList, address) => {
    const addresses = _.filter(addressList, item => { return item !== address; });

    return (dispatch) => {
        dispatch({ type: ADDRESS_REMOVE_START });

        firebase.database().ref(`/users/${uid}`)
            .update({ addresses })
            .then(() => {
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
