import {
    RESTAURANTS_FETCH_SUCCESS,
    RESTAURANT_FILTRATION_BY_TYPE,
    LOGOUT_USER_SUCCESS
} from '../actions/types';

const INITIAL_STATE = {
    restaurants: [],
    restaurantsFetched: false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_FILTRATION_BY_TYPE:
            return { ...state, restaurants: action.payload, restaurantsFetched: true };
        case RESTAURANTS_FETCH_SUCCESS:
            return { ...state, restaurants: action.payload, restaurantsFetched: true };
        case LOGOUT_USER_SUCCESS:
            return { ...state, ...INITIAL_STATE };
        default:
            return state;
    }
};
