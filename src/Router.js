import React from 'react';
import { Scene, Stack, Router, Lightbox, Reducer } from 'react-native-router-flux';
import { analyticsTracker } from './App';
import LoginForm from './components/auth/LoginForm';
import RestaurantList from './components/main/restaurant/RestaurantList';
import RestaurantInfo from './components/main/restaurant/RestaurantInfo';
import RestaurantTypeSelection from './components/main/restaurant/RestaurantTypeSelection';
import CategoryInfo from './components/main/category/CategoryInfo';
import OrderInfo from './components/main/order/OrderInfo';
import OrderResetWarning from './components/main/order/OrderResetWarning';
import OrderAddress from './components/main/order/OrderAddress';
import OrderDone from './components/main/order/OrderDone';
import RegistryForm from './components/auth/RegistryForm';
import UserAccountMenu from './components/main/account/UserAccountMenu';
import Presentation from './components/Presentation';
import UserAccountAddress from './components/main/account/UserAccountAddress';
import UserAccountAddressForm from './components/main/account/UserAccountAddressForm';
import UserAccountOrder from './components/main/account/UserAccountOrder';
import UserAccountOrderInfo from './components/main/account/UserAccountOrderInfo';
import UserAccountSettings from './components/main/account/UserAccountSettings';
import UserAccountLanguageSelection from './components/main/account/UserAccountLanguageSelection';


const reducerCreate = (params) => {
    const defaultReducer = new Reducer(params);
    return (state, action) => {
        if (action.type === 'REACT_NATIVE_ROUTER_FLUX_FOCUS')
            analyticsTracker.trackScreenView(action.routeName);

        return defaultReducer(state, action);
    };
};

const RouterComponent = () => {
    return (
        <Router backAndroidHandler={() => true} createReducer={reducerCreate} key={'es'}>
            <Lightbox>
                <Stack key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene
                            initial
                            key="presentation"
                            component={Presentation}
                            hideNavBar
                        />
                        <Scene
                            key="login"
                            component={LoginForm}
                            hideNavBar
                        />
                        <Scene
                            key="registry"
                            component={RegistryForm}
                            hideNavBar
                        />
                    </Scene>

                    <Stack key="main">
                        <Scene
                            drawer
                            contentComponent={UserAccountMenu}
                            key="userAccountMenu"
                            drawerWidth={300}
                            drawerPosition="right"
                            hideNavBar
                            gesturesEnabled={false}
                        >
                            <Scene
                                initial
                                key="restaurantList"
                                component={RestaurantList}
                                hideNavBar
                            />
                        </Scene>
                        <Scene
                            key="restaurantInfo"
                            component={RestaurantInfo}
                            hideNavBar
                        />
                        <Scene
                            key="categoryInfo"
                            component={CategoryInfo}
                            hideNavBar
                        />
                        <Scene
                            key="orderInfo"
                            component={OrderInfo}
                            hideNavBar
                        />
                        <Scene
                            key="orderAddress"
                            component={OrderAddress}
                            hideNavBar
                        />
                        <Scene
                            key="orderDone"
                            component={OrderDone}
                            hideNavBar
                        />
                        <Scene
                            key="userAccountAddress"
                            component={UserAccountAddress}
                            hideNavBar
                        />
                        <Scene
                            key="userAccountOrder"
                            component={UserAccountOrder}
                            hideNavBar
                        />
                        <Scene
                            key="userAccountOrderInfo"
                            component={UserAccountOrderInfo}
                            hideNavBar
                        />
                        <Scene
                            key="userAccountSettings"
                            component={UserAccountSettings}
                            hideNavBar
                        />
                    </Stack>
                </Stack>

                <Scene
                    key="restaurantTypeSelection"
                    component={RestaurantTypeSelection}
                />
                <Scene
                    key="orderResetWarning"
                    component={OrderResetWarning}
                />
                <Scene
                    key="userAccountAddressForm"
                    component={UserAccountAddressForm}
                />
                <Scene
                    key="userAccountLanguageSelection"
                    component={UserAccountLanguageSelection}
                />
            </Lightbox>
        </Router>
    );
};

export default RouterComponent;
