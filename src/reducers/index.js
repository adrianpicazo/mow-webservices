import { combineReducers } from 'redux';
import RestaurantReducer from './RestaurantReducer';
import AuthReducer from './AuthReducer';
import RestaurantTypesReducer from './RestaurantTypesReducer';
import OrderReducer from './OrderReducer';
import RegistryReducer from './RegistryReducer';
import UserAccountReducer from './UserAccountReducer';
import UserAddressFormReducer from './UserAddressFormReducer';
import OrderAddressFormReducer from './OrderAddressFormReducer';
import UserAddressesReducer from './UserAddressesReducer';
import OrderDoneReducer from './OrderDoneReducer';
import UserOrdersReducer from './UserOrdersReducer';
import PresentationReducer from './PresentationReducer';

export default combineReducers({
    restaurantListScreen: RestaurantReducer,
    auth: AuthReducer,
    restaurantTypes: RestaurantTypesReducer,
    userOrder: OrderReducer,
    registry: RegistryReducer,
    account: UserAccountReducer,
    userAddressForm: UserAddressFormReducer,
    userAddresses: UserAddressesReducer,
    orderAddressForm: OrderAddressFormReducer,
    orderDone: OrderDoneReducer,
    userOrders: UserOrdersReducer,
    presentation: PresentationReducer
});
