import {
    ORDER_ADDRESS_FORM_RESET,
    ORDER_ADDRESS_FORM_CHANGE,
    ORDER_ADDRESS_FORM_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    address: '',
    error: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_ADDRESS_FORM_RESET:
            return { ...state, ...INITIAL_STATE, address: action.payload };
        case ORDER_ADDRESS_FORM_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case ORDER_ADDRESS_FORM_FAILURE:
            return { ...state, ...INITIAL_STATE, error: action.payload };
        default:
            return state;
    }
};
