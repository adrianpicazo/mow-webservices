import _ from 'lodash';
import {
    ORDER_ADD_RESTAURANT,
    ORDER_RESET,
    ORDER_ADD_PRODUCT,
    ORDER_REMOVE_PRODUCT,
    ORDER_ADDRESS_ADDITION
} from '../actions/types';

const INITIAL_STATE = {
    selectedRestaurantId: -1,
    products: [],
    numProducts: 0,
    subtotalPrice: 0.0,
    otherExpenses: [{ name: 'Gastos de entrega', priceEuros: 0.0 }],
    totalPrice: 0.0,
    address: ''
};

// EXAMPLE_STATE
// TODO: borrar el estado ejemplo.
const EXAMPLE_STATE = {
    selectedRestaurantId: 0,
    products: [
        { name: 'Calamares a la Romana', priceEuros: 6.75, quantity: 2 },
        { name: 'Puntillas', priceEuros: 7.75, quantity: 1 },
        { name: 'Ensalada de aguacate', priceEuros: 4.75, quantity: 1 }
    ],
    numProducts: 5,
    subtotalPrice: 33.75,
    otherExpenses: [{ name: 'Gastos de entrega', priceEuros: 0.0 }],
    totalPrice: 33.75,
    address: 'Partida Benadresa, 90, Castelló de la Plana'
};

const addProduct = (state, action) => {
    const { name, priceEuros } = action.payload.value;
    const newState = { ...state };

    newState.products = state.products.slice();
    newState.numProducts = state.numProducts + 1;
    newState.subtotalPrice += priceEuros;
    newState.totalPrice += priceEuros;

    const index = _.findIndex(state.products, element => { return element.name === name; });

    if (index >= 0) {
        newState.products[index].quantity++;
    } else {
        newState.products.push({ ...action.payload.value, quantity: 1 });
    }

    return newState;
};

const removeProduct = (state, action) => {
    const { name, priceEuros } = action.payload.value;
    const newState = { ...state };

    newState.numProducts = state.numProducts - 1;
    newState.subtotalPrice -= priceEuros;
    newState.totalPrice -= priceEuros;

    const index = _.findIndex(state.products, element => { return element.name === name; });

    if (index >= 0) {
        newState.products[index].quantity--;

        if (newState.products[index].quantity === 0) {
            _.remove(state.products, element => {
                return element.name === name;
            });
        }
    }

    return newState;
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ORDER_ADD_RESTAURANT:
            return { ...state, selectedRestaurantId: action.payload.id };
        case ORDER_RESET:
            return { ...state, ...INITIAL_STATE };
        case ORDER_ADD_PRODUCT:
            return addProduct(state, action);
        case ORDER_REMOVE_PRODUCT:
            return removeProduct(state, action);
        case ORDER_ADDRESS_ADDITION:
            return { ...state, address: action.payload };
        default:
            return state;
    }
};
