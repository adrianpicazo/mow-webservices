import {
    RESTAURANT_MAP_RESET,
    RESTAURANT_MAP_SELECTION
} from '../actions/types';

const INITIAL_STATE = {
    mapRestaurantSelected: null
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_MAP_RESET:
            return { ...state, ...INITIAL_STATE };
        case RESTAURANT_MAP_SELECTION:
            return { ...state, mapRestaurantSelected: action.payload };
        default:
            return state;
    }
};
