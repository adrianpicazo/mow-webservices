import {
    ADDRESSES_FETCH_START,
    ADDRESSES_FETCH_SUCCESS,
    ADDRESSES_FETCH_FAILURE,
    ADDRESS_ADD_START,
    ADDRESS_ADD_SUCCESS,
    ADDRESS_ADD_FAILURE,
    ADDRESS_REMOVE_FAILURE,
    ADDRESS_REMOVE_SUCCESS,
    ADDRESS_REMOVE_START
} from '../actions/types';

const INITIAL_STATE = {
    fetchLoading: false,
    fetchFailure: '',
    removeFailure: '',
    removeSuccess: 'false',
    addLoading: false,
    addSuccess: false,
    addFailure: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDRESSES_FETCH_START:
            return { ...state, ...INITIAL_STATE, fetchLoading: true };
        case ADDRESSES_FETCH_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        case ADDRESSES_FETCH_FAILURE:
            return { ...state, ...INITIAL_STATE, fetchFailure: action.payload };

        case ADDRESS_ADD_START:
            return { ...state, ...INITIAL_STATE, addLoading: true };
        case ADDRESS_ADD_SUCCESS:
            return { ...state, ...INITIAL_STATE, addSuccess: true };
        case ADDRESS_ADD_FAILURE:
            return { ...state, ...INITIAL_STATE, addFailure: action.payload };

        case ADDRESS_REMOVE_START:
            return { ...state, ...INITIAL_STATE, removeSuccess: false, removeFailure: '' };
        case ADDRESS_REMOVE_SUCCESS:
            return { ...state, ...INITIAL_STATE, removeSuccess: true };
        case ADDRESS_REMOVE_FAILURE:
            return { ...state, ...INITIAL_STATE, removeFailure: action.payload };

        default:
            return state;
    }
};
