import {
    USER_ACCOUNT_FETCH_START,
    USER_ACCOUNT_FETCH_SUCCESS,
    USER_ACCOUNT_FETCH_FAILURE,
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACCOUNT_FETCH_START:
            return { ...state, ...INITIAL_STATE, loading: true };
        case USER_ACCOUNT_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case USER_ACCOUNT_FETCH_FAILURE:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
