import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_RESET,
    LOGIN_FIELDS_CHANGED,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
    LOGOUT_USER_FAILURE,
    USER_ACCOUNT_FETCH_START,
    USER_ACCOUNT_FETCH_SUCCESS,
    USER_ACCOUNT_FETCH_FAILURE
} from './types';
import AsyncStorage, { AUTH_DATA } from '../utils/AsyncStorage';

export const loginReset = () => {
    return {
        type: LOGIN_RESET
    };
};

export const loginFieldsChanged = ({ prop, value }) => {
    return {
        type: LOGIN_FIELDS_CHANGED,
        payload: { prop, value }
    };
};

export const loginUserError = ({ error }) => {
    return {
        type: LOGIN_USER_ERROR,
        payload: { error }
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });

        firebase.auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(userInfo => {
                const { uid } = userInfo.user;

                try {
                    firebase.database()
                        .ref(`/users/${uid}/account`)
                        .on('value', snapshot => {
                            const { language, name, surnames } = snapshot.val();

                            dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: { uid, language, name, surnames, email }
                            });

                            Actions.push('main');
                        });
                } catch (error) {
                    dispatch({
                        type: LOGIN_USER_FAIL,
                        payload: error.message
                    });
                }
            })
            .catch((error) => {
                dispatch({
                    type: LOGIN_USER_FAIL,
                    payload: error.message
                });
            });
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER_START });

        firebase.auth().signOut()
            .then(() => {
                AsyncStorage.delete(AUTH_DATA)
                    .then(() => {
                        dispatch({
                            type: LOGOUT_USER_SUCCESS
                        });

                        Actions.push('presentation');
                    })
                    .catch(error => {
                        dispatch({
                            type: LOGOUT_USER_FAILURE,
                            payload: error.message
                        });
                    });
            })
            .catch((error) => {
                dispatch({
                    type: LOGOUT_USER_FAILURE,
                    payload: error.message
                });
            });
    };
};

export const userAccountFetchFromAsyncStorage = (addEventListeners) => {
    return (dispatch) => {
        dispatch({ type: USER_ACCOUNT_FETCH_START });

        AsyncStorage.get(AUTH_DATA)
            .then(data => {
                dispatch({
                    type: USER_ACCOUNT_FETCH_SUCCESS,
                    payload: data
                });

                addEventListeners();
            })
            .catch(error => {
                dispatch({
                    type: USER_ACCOUNT_FETCH_FAILURE,
                    payload: error.message
                });

                addEventListeners();
            });
    };
};
