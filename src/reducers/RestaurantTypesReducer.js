import {
    SELECT_ALL_RESTAURANT_TYPES,
    SELECT_RESTAURANT_TYPE
} from '../actions/types';

const INITIAL_STATE = {
    mexican: { label: 'Mexicana', value: true },
    american: { label: 'Americana', value: true },
    italian: { label: 'Italiana', value: true },
    japanese: { label: 'Japonesa', value: true },
    spanish: { label: 'Española', value: true },
    colombian: { label: 'Colombiana', value: true },
    china: { label: 'China', value: true },
    arabian: { label: 'Árabe', value: true },
    hindu: { label: 'Hindú', value: true },
    greek: { label: 'Griega', value: true },
    turkey: { label: 'Turca', value: true }
};

const changeAllValuesToTheSame = (state, value) => {
    const newState = { ...state };
    Object.keys(newState).map((propKey) => {
        newState[propKey].value = value;
        return null;
    });
    return newState;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_ALL_RESTAURANT_TYPES:
            return changeAllValuesToTheSame(state, action.payload);
        case SELECT_RESTAURANT_TYPE:
            return {
                ...state,
                [action.payload.prop]: {
                    ...state[action.payload.prop],
                    value: action.payload.value
                }
            };
        default:
            return state;
    }
};
