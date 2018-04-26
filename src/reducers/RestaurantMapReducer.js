import {
    RESTAURANT_SETTING_MAP_SUCCESS,
    RESTAURANT_SETTING_MAP_FAILURE, RESTAURANT_MAP_SELECTION
} from '../actions/types';

const INITIAL_STATE = {
    mapRestaurants: [],
    error: '',
    mapRestaurantSelected: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_SETTING_MAP_SUCCESS:
            return { ...state, ...INITIAL_STATE, mapRestaurants: action.payload };
        case RESTAURANT_SETTING_MAP_FAILURE:
            return { ...state, error: action.payload };
        case RESTAURANT_MAP_SELECTION:
            return { ...state, mapRestaurantSelected: action.payload }
        default:
            return state;
    }
};
