import {
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANT_FILTRATION_BY_TYPE
} from '../actions/types';

const INITIAL_STATE = {
    restaurants: []
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_FILTRATION_BY_TYPE:
            return { ...state, restaurants: action.payload };
        case RESTAURANTS_FETCH_SUCCESS:
            return { ...state, restaurants: action.payload };
        default:
            return state;
    }
};
