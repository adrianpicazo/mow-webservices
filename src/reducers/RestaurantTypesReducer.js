import _ from 'lodash';
import {
    RESTAURANT_TYPES_FETCH_SUCCESS,
    RESTAURANT_TYPE_ALL_SELECTION,
    RESTAURANT_TYPE_SELECTION
} from '../actions/types';

const INITIAL_STATE = {
    types: null,
    fetched: false
};

const createCheckboxStates = (state, action) => {
    const restaurantTypesFetched = action.payload;
    const newState = { ...state };

    newState.types = _.map(restaurantTypesFetched, value => ({
          name: value,
          selected: true
      }));

    newState.fetched = true;

    return newState;
};

const changeValue = (state, action) => {
    const newState = { ...state, types: [...state.types] };
    const key = _.findKey(newState.types, type => type.name === action.payload);

    newState.types[key] = { ...state.types[key] };
    newState.types[key].selected = !newState.types[key].selected;

    return newState;
};

const changeAllValuesToTheSame = (state, action) => {
    const newState = { ...state, types: [...state.types] };

    _.forEach(newState.types, (type, key) => {
        newState.types[key] = { ...state.types[key] };
        newState.types[key].selected = action.payload;
    });

    return newState;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case RESTAURANT_TYPES_FETCH_SUCCESS:
            return createCheckboxStates(state, action);
        case RESTAURANT_TYPE_ALL_SELECTION:
            return changeAllValuesToTheSame(state, action);
        case RESTAURANT_TYPE_SELECTION:
            return changeValue(state, action);
        default:
            return state;
    }
};
