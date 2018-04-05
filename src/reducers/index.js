import { combineReducers } from 'redux';
import RestaurantReducer from './RestaurantReducer';
import AuthReducer from './AuthReducer';
import RestaurantTypesReducer from './RestaurantTypesReducer';
import RestaurantSelectedReducer from './RestaurantSelectedReducer';
import OrderReducer from './OrderReducer';
import RegistryReducer from './RegistryReducer';
import UserAccountReducer from './UserAccountReducer';
import AddressFormReducer from './AddressFormReducer';
import OrderAddressFormReducer from './OrderAddressFormReducer';

export default combineReducers({
    restaurantListScreen: RestaurantReducer,
    auth: AuthReducer,
    selectedRestaurantTypes: RestaurantTypesReducer,
    restaurantSelected: RestaurantSelectedReducer,
    order: OrderReducer,
    registry: RegistryReducer,
    account: UserAccountReducer,
    addressForm: AddressFormReducer,
    orderAddressForm: OrderAddressFormReducer
});
