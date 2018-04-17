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
                            payload: 'Snapshot is null.'
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

export const addressAdd = (addressList, address) => {
    const { currentUser } = firebase.auth();

    let addresses;

    if (addressList !== null) {
        if (_.find(addressList, item => { return item === address; })) {
            return {
                type: ADDRESS_ADD_FAILURE,
                payload: 'Dirección repetida'
            };
        }
        addresses = _.concat(addressList, address);
    } else {
        addresses = [address];
    }

    return (dispatch) => {
        dispatch({ type: ADDRESS_ADD_START });

        firebase.database().ref(`/users/${currentUser.uid}`)
            .update({ addresses })
            .then(() => {
                dispatch({
                    type: ADDRESS_ADD_SUCCESS,
                    payload: addresses
                });
            })
            .catch(error => {
                addressAddFailure(dispatch, error);
            });
    };
};

const addressAddFailure = (dispatch, error) => {
    dispatch({
        type: ADDRESS_ADD_FAILURE,
        payload: error.message
    });
};

export const addressRemove = (addressList, address) => {
    const { currentUser } = firebase.auth();
    const addresses = _.filter(addressList, item => { return item !== address; });

    return (dispatch) => {
        dispatch({ type: ADDRESS_REMOVE_START });

        firebase.database().ref(`/users/${currentUser.uid}`)
            .update({ addresses })
            .then(() => {
                dispatch({
                    type: ADDRESS_REMOVE_SUCCESS,
                    payload: addresses
                });
            })
            .catch(error => {
                addressRemoveFailure(dispatch, error);
            });
    };
};

const addressRemoveFailure = (dispatch, error) => {
    dispatch({
        type: ADDRESS_REMOVE_FAILURE,
        payload: error.message
    });
};
