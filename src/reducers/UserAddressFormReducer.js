import {
    ADDRESS_FORM_RESET,
    ADDRESS_FORM_CHANGE,
    ADDRESS_FORM_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
    formAddress: 'Dirección de prueba',
    formError: '',
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ADDRESS_FORM_RESET:
            return { ...state, ...INITIAL_STATE };
        case ADDRESS_FORM_CHANGE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case ADDRESS_FORM_ERROR:
            return { ...state, ...INITIAL_STATE, formError: action.payload };
        default:
            return state;
    }
};
