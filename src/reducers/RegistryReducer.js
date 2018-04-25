import {
    REGISTRY_RESET,
    REGISTRY_FIELDS_CHANGED,
    REGISTRY_USER_ERROR,
    REGISTRY_USER_START,
    REGISTRY_USER_FAIL,
    REGISTRY_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    surnames: '',
    email: '',
    password: '',
    repeatedPassword: '',
    error: '',
    loading: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case REGISTRY_RESET:
            return { ...state, ...INITIAL_STATE };
        case REGISTRY_FIELDS_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case REGISTRY_USER_START:
            return { ...state, loading: true, error: '' };
        case REGISTRY_USER_ERROR:
            return { ...state, error: action.payload.error, loading: false };
        case REGISTRY_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case REGISTRY_USER_FAIL:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
