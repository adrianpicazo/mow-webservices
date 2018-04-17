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
    SKIP_LOGIN_USER_START,
    SKIP_LOGIN_USER_FINISH
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

export const skipLoginUser = () => {
    return (dispatch) => {
        dispatch({ type: SKIP_LOGIN_USER_START });

        AsyncStorage.get(AUTH_DATA)
            .then(data => {
                if (data) {
                    dispatch({
                        type: LOGIN_USER_SUCCESS,
                        payload: data
                    });

                    Actions.push('main');
                } else Actions.push('login');
            })
            .catch(error => {
                console.warn(error);
                Actions.push('login');
            });

        dispatch({ type: SKIP_LOGIN_USER_FINISH });
    };
};

export const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });

        firebase.auth()
            .signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(userInfo => loginUserSuccess(dispatch, userInfo))
            .catch((error) => {
                loginUserFail(dispatch, error);
            });
    };
};

const loginUserSuccess = (dispatch, userInfo) => {
    const { uid } = userInfo.user;

    firebase.database()
        .ref(`/users/${uid}/account`)
        .on('value', snapshot => {
            const { name, surnames, email } = snapshot.val();

            dispatch({
                type: LOGIN_USER_SUCCESS,
                payload: { uid, name, surnames, email }
            });
        });

    Actions.push('main');
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.message
    });
};

export const logoutUser = () => {
    return (dispatch) => {
        dispatch({ type: LOGOUT_USER_START });

        firebase.auth().signOut()
            .then(() => logoutUserSuccess(dispatch))
            .catch((error) => {
                console.log(error);
            });
    };
};

const logoutUserSuccess = (dispatch) => {
    AsyncStorage.delete(AUTH_DATA)
        .then(() => {
            dispatch({
                type: LOGOUT_USER_SUCCESS
            });

            Actions.push('presentation');
        })
        .catch(error => {
            dispatch({
                type: LOGOUT_USER_FAILURE
            });

            console.warn(error);
        });
};
