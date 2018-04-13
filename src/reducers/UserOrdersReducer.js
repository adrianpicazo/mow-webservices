import {
    ORDERS_FETCH_START,
    ORDERS_FETCH_SUCCESS,
    ORDERS_FETCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    fetchLoading: false,
    fetchFailure: '',
    fetchSuccess: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDERS_FETCH_START:
            return { ...state, ...INITIAL_STATE, fetchLoading: true };
        case ORDERS_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE, fetchSuccess: true };
        case ORDERS_FETCH_FAILURE:
            return { ...state, ...INITIAL_STATE, fetchFailure: action.payload };
        default:
            return state;
    }
};
