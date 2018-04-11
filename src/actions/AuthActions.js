import firebase from 'react-native-firebase';
import { Actions } from 'react-native-router-flux';
import {
    LOGIN_RESET,
    LOGIN_FIELDS_CHANGED,
    LOGIN_USER_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    LOGOUT_USER_START, LOGOUT_USER_SUCCESS
} from './types';
import { HEADER, URL } from '../components/webservices/Request';

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

        /**
        const body = `json=${JSON.stringify({
            email,
            password
        })}`;

        fetch(
            URL.concat('login'),
            {
                method: 'POST',
                headers: HEADER,
                body,
            }
        ).then(response => response.json())
            .catch(error => loginUserFail(dispatch, error))
            .then(response => loginUserSuccess(dispatch, response));
        **/

        // TODO: borrar
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(user => loginUserSuccess(dispatch, user))
            .catch((error) => {
                loginUserFail(dispatch, error);
            });
    };
};

const loginUserFail = (dispatch, error) => {
    dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.message
    });
};

const loginUserSuccess = (dispatch, user) => {
    /**
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.token
    });
     **/

    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: user
    });

    Actions.main({});
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
    dispatch({
        type: LOGOUT_USER_SUCCESS
    });

    Actions.push('login');
};
