import { Actions } from 'react-native-router-flux';

const NEW_RESTAURANT_ADDED = 'new_restaurant_added';
const ORDER_DELIVERED = 'order_delivered';

export const notificationCenter = (user, openResult) => {
    const { actionID } = openResult.action;

    switch (actionID) {
        case NEW_RESTAURANT_ADDED:
            newRestaurantAdded(user);
            break;
        case ORDER_DELIVERED:
            orderDelivered(user, openResult);
            break;
        default:
            console.warn('Action unknown: ', actionID);
            break;
    }
};

const newRestaurantAdded = (user) => {
    if (user)
        Actions.push('main');
    else
        Actions.push('login');
};

const orderDelivered = (user, openResult) => {
    //const { orderId } = openResult.additionalData;

    if (user) {
        Actions.push('main');

        console.warn('ENTREGADO: ', openResult.notification);
    } else Actions.push('login');
};
