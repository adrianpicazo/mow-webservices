import {
    SKIP_LOGIN_USER_START,
    SKIP_LOGIN_USER_FINISH,
} from '../actions/types';

const INITIAL_STATE = {
    loading: false,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SKIP_LOGIN_USER_START:
            return { ...state, loading: true };
        case SKIP_LOGIN_USER_FINISH:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
