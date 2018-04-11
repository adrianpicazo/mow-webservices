import {
    ADDRESS_FORM_RESET,
    ADDRESS_FORM_CHANGE,
    ADDRESS_FORM_FAILURE,
    ADDRESS_UPDATE_START,
    ADDRESS_UPDATE_SUCCESS,
    ADDRESS_UPDATE_FAILURE,
    ADDRESSES_FETCH_START,
    ADDRESSES_FETCH_SUCCESS,
    ADDRESSES_FETCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    address: '',
    error: '',
    loading: false,
    updated: false,

    addresses: null,
    fetchLoading: false,
    fetchFailure: ''
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
        case ADDRESSES_FETCH_START:
            return { ...state, ...INITIAL_STATE, fetchLoading: true };
        case ADDRESSES_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE, addresses: action.payload };
        case ADDRESSES_FETCH_FAILURE:
            return { ...state, ...INITIAL_STATE, fetchFailure: action.payload };
        default:
            return state;
    }
};
