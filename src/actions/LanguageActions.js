import { I18nUtils } from '../utils/I18nUtils';
import { LANGUAGE_SELECTION, LANGUAGE_SELECTION_SUCCESS } from './types';

export const languageSelection = (languageSelected) => {
    return {
        type: LANGUAGE_SELECTION,
        payload: languageSelected
    };
};

export const languageSelectionDone = (languageSelected) => {
    I18nUtils.setLocale(languageSelected);

    return {
        type: LANGUAGE_SELECTION_SUCCESS,
        payload: languageSelected
    };
};
