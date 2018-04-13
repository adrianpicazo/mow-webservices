import {
    ORDER_ADDRESSES_FETCH_START,
    ORDER_ADDRESSES_FETCH_SUCCESS,
    ORDER_ADDRESSES_FETCH_FAILURE,
    ORDER_ADDRESS_FORM_RESET,
    ORDER_ADDRESS_FORM_CHANGE,
    ORDER_ADDRESS_FORM_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    fetchLoading: false,
    fetchFailure: '',
    formAddress: '',
    formError: ''
};

const FORM_RESET_STATE = {
    formAddress: '',
    formError: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_ADDRESSES_FETCH_START:
            return { ...state, ...INITIAL_STATE, fetchLoading: true };
        case ORDER_ADDRESSES_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case ORDER_ADDRESSES_FETCH_FAILURE:
            return { ...state, ...INITIAL_STATE, fetchFailure: action.payload };

        case ORDER_ADDRESS_FORM_RESET:
            return { ...state, ...FORM_RESET_STATE };
        case ORDER_ADDRESS_FORM_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case ORDER_ADDRESS_FORM_FAILURE:
            return { ...state, formError: action.payload };

        default:
            return state;
    }
};
