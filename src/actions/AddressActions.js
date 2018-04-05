import firebase from 'react-native-firebase';
import {
    ADDRESS_FORM_RESET,
    ADDRESS_FORM_CHANGE,
    ADDRESS_FORM_FAILURE,
    ADDRESS_UPDATE_START,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAILURE
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

export const addressFormFailure = (error) => {
    return {
        type: ADDRESS_FORM_FAILURE,
        payload: error
    };
};

export const addressUpdate = (address) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        dispatch({ type: ADDRESS_UPDATE_START });

        firebase.database().ref(`/users/${currentUser.uid}/account`)
            .update({ address })
            .then(() => {
                dispatch({
                    type: ADDRESS_UPDATE_SUCCESS,
                    payload: address
                });
            })
            .catch(error => {
                addressUpdateFailure(dispatch, error);
            });
    };
};

const addressUpdateFailure = (dispatch, error) => {
    dispatch({
        type: ADDRESS_UPDATE_FAILURE,
        payload: error.message
    });
};
