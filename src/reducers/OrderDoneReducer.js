import {
    ORDER_START,
    ORDER_SUCCESS,
    ORDER_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
    orderLoading: false,
    orderSuccess: false,
    orderFailure: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_START:
            return { ...state, ...INITIAL_STATE, orderLoading: true };
        case ORDER_SUCCESS:
            return { ...state, ...INITIAL_STATE, orderSuccess: true };
        case ORDER_FAILURE:
            return { ...state, ...INITIAL_STATE, orderFailure: action.payload };
        default:
            return state;
    }
};
