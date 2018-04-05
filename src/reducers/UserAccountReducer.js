import {
    USER_ACCOUNT_FETCH_SUCCESS,
    ADDRESS_UPDATE_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    surnames: '',
    email: '',
    address: ''
};

const setUserAccountProps = (state, action) => {
    const { name, surnames, email, address } = action.payload;
    const newState = { ...state };

    newState.name = name;
    newState.surnames = surnames;
    newState.email = email;
    newState.address = address;

    return newState;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_ACCOUNT_FETCH_SUCCESS:
            return setUserAccountProps(state, action);
        case ADDRESS_UPDATE_SUCCESS:
            return { ...state, address: action.payload };
        default:
            return state;
    }
};
