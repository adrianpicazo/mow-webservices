import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    REGISTRY_RESET,
    REGISTRY_FIELDS_CHANGED,
    REGISTRY_USER_ERROR,
    REGISTRY_USER_START,
    REGISTRY_USER_FAIL,
    REGISTRY_USER_SUCCESS
} from './types';

export const registryReset = () => {
    return {
        type: REGISTRY_RESET
    };
};

export const registryFieldsChanged = ({ prop, value }) => {
    return {
        type: REGISTRY_FIELDS_CHANGED,
        payload: { prop, value }
    };
};

export const registryUserError = ({ error }) => {
    return {
        type: REGISTRY_USER_ERROR,
        payload: { error }
    };
};

export const registryUser = (registryForm) => {
    const { email, password } = registryForm;

    return (dispatch) => {
        dispatch({ type: REGISTRY_USER_START });

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(user => registryUserSuccess(dispatch, user, registryForm))
            .catch(error => {
                registryUserFail(dispatch, error);
            });
    };
};

const registryUserFail = (dispatch, error) => {
    dispatch({
        type: REGISTRY_USER_FAIL,
        payload: error.message
    });
};

const registryUserSuccess = (dispatch, user, registryForm) => {
    const { name, surnames, email, password } = registryForm;
    const { uid } = user;
    const address = '';

    firebase.database().ref('/users').child(`/${uid}/account`)
        .set({ name, surnames, email, address })
        .then(() => {
            dispatch({
                type: REGISTRY_USER_SUCCESS,
                payload: { email, password }
            });

            Actions.push('login');
        })
        .catch(error => {
            registryUserFail(dispatch, error);
        });
};
