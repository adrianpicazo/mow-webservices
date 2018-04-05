import {
    ADDRESS_FORM_RESET,
    ADDRESS_FORM_CHANGE,
    ADDRESS_FORM_FAILURE,
    ADDRESS_UPDATE_START,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    address: '',
    error: '',
    loading: false,
    updated: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDRESS_FORM_RESET:
            return { ...state, ...INITIAL_STATE };
        case ADDRESS_FORM_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case ADDRESS_FORM_FAILURE:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case ADDRESS_UPDATE_START:
            return { ...state, ...INITIAL_STATE, loading: true };
        case ADDRESS_UPDATE_SUCCESS:
            return { ...state, ...INITIAL_STATE, updated: true };
        case ADDRESS_UPDATE_FAILURE:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
