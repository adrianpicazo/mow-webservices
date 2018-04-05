import {
    LOGIN_RESET,
    LOGIN_FIELDS_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_ERROR,
    LOGIN_USER_FAIL,
    LOGIN_USER_START,
    REGISTRY_USER_SUCCESS,
    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
    email: '',
    password: '',
    error: '',
    loading: false,
    registrySuccess: false
};

// TODO: borrar el estado ejemplo.
const EXAMPLE_STATE = {
    email: 'test@test.com',
    password: '123456',
    error: '',
    loading: false,
    registrySuccess: false
};

// TODO: decidir sobre las acciones logout
export default (state = EXAMPLE_STATE, action) => {
    switch (action.type) {
        case LOGIN_RESET:
            return { ...state, ...INITIAL_STATE };
        case LOGIN_FIELDS_CHANGED:
            return { ...state, [action.payload.prop]: action.payload.value };
        case LOGIN_USER_START:
            return { ...state, loading: true, error: '' };
        case LOGIN_USER_ERROR:
            return { ...state, ...INITIAL_STATE, error: action.payload.error };
        case LOGIN_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case LOGIN_USER_FAIL:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        case LOGOUT_USER_START:
            return { ...state, ...INITIAL_STATE };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case REGISTRY_USER_SUCCESS:
            return {
                ...state,
                ...INITIAL_STATE,
                registrySuccess: true,
                email: action.payload.email,
                password: action.payload.password
            };
        default:
            return state;
    }
};
