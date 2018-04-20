import { Actions } from 'react-native-router-flux';
import firebase from 'react-native-firebase';

const NEW_RESTAURANT_ADDED = 'new_restaurant_added';
const ORDER_DELIVERED = 'order_delivered';

export const notificationCenter = (userUid, openResult) => {
    const { actionID } = openResult.action;

    switch (actionID) {
        case NEW_RESTAURANT_ADDED:
            newRestaurantAdded(userUid, openResult);
            break;
        case ORDER_DELIVERED:
            orderDelivered(userUid, openResult);
            break;
        default:
            console.warn('Action unknown: ', actionID);
            break;
    }
};

const newRestaurantAdded = (userUid, openResult) => {
    const { restaurantId } = openResult.notification.payload.additionalData;

    if (userUid !== '') {
        firebase.database()
            .ref(`/restaurants/${restaurantId}`)
            .on('value', snapshot => {
                const restaurant = snapshot.val();

                Actions.push('restaurantInfo', { restaurant });
            });
    } else Actions.push('login');
};

const orderDelivered = (userUid, openResult) => {
    const { orderId } = openResult.notification.payload.additionalData;

    if (userUid !== '') {
        firebase.database()
            .ref(`/users/${userUid}/orders/${orderId}`)
            .on('value', snapshot => {
                const order = snapshot.val();

                Actions.push('userAccountOrderInfo', { order });
            });
    } else Actions.push('login');
};
