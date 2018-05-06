import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
    REGISTRY_RESET,
    REGISTRY_FIELDS_CHANGED,
    REGISTRY_USER_ERROR,
    REGISTRY_USER_START,
    REGISTRY_USER_FAIL,
    REGISTRY_USER_SUCCESS
} from './types';
import { URL } from '../components/webservices/Request';
import { I18nUtils } from '../utils/I18nUtils';

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
    const { name, surnames, email, password } = registryForm;

    return (dispatch) => {
        dispatch({ type: REGISTRY_USER_START });

        const data = {
            name,
            surname: surnames,
            email,
            password,
            nick: email,
            language: I18nUtils.getLanguage()
        };

        axios.post(URL.concat('register'), data)
            .then(() => {
                dispatch({
                    type: REGISTRY_USER_SUCCESS,
                    payload: { email, password }
                });

                Actions.push('login');
            })
            .catch(error => {
                dispatch({
                    type: REGISTRY_USER_FAIL,
                    payload: error.message
                });
            });
    };
};
