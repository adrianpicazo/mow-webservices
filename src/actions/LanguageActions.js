import firebase from 'react-native-firebase';
import { I18nUtils } from '../utils/I18nUtils';
import {
    LANGUAGE_CHANGE_FAILURE,
    LANGUAGE_CHANGE_START,
    LANGUAGE_CHANGE_SUCCESS,
    LANGUAGE_SELECTION
} from './types';

export const languageSelection = (language) => {
    return {
        type: LANGUAGE_SELECTION,
        payload: language
    };
};

export const languageSelectionDone = (uid, language) => {
    return (dispatch) => {
        dispatch({ type: LANGUAGE_CHANGE_START });

        firebase.database()
            .ref(`/users/${uid}/account`)
            .update({ language })
            .then(() => {
                I18nUtils.setLocale(language);

                dispatch({
                    type: LANGUAGE_CHANGE_SUCCESS,
                    payload: language
                });
            })
            .catch(error => {
                dispatch({
                    type: LANGUAGE_CHANGE_FAILURE,
                    payload: error.message
                });
            });
    };
};
