import {
    LANGUAGE_CHANGE_FAILURE,
    LANGUAGE_CHANGE_START,
    LANGUAGE_CHANGE_SUCCESS,
    LANGUAGE_SELECTION,
} from '../actions/types';

const INITIAL_STATE = {
    es: false,
    en: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LANGUAGE_SELECTION:
            return { ...state, ...INITIAL_STATE, [action.payload]: true };
        case LANGUAGE_CHANGE_START:
            return state;
        case LANGUAGE_CHANGE_SUCCESS:
            return { ...state, ...INITIAL_STATE, [action.payload]: true };
        case LANGUAGE_CHANGE_FAILURE:
            return state;
        default:
            return state;
    }
};
