import { LANGUAGE_SELECTION } from '../actions/types';

const INITIAL_STATE = {
    es: false,
    en: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LANGUAGE_SELECTION:
            return { ...state, ...INITIAL_STATE, [action.payload]: true };
        default:
            return state;
    }
};
