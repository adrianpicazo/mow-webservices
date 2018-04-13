import React from 'react';
import { Scene, Stack, Router, Lightbox } from 'react-native-router-flux';
import LoginForm from './components/auth/LoginForm';
import RestaurantList from './components/main/restaurant/RestaurantList';
import RestaurantInfo from './components/main/restaurant/RestaurantInfo';
import RestaurantTypeSelection from './components/main/restaurant/RestaurantTypeSelection';
import CategoryInfo from './components/main/category/CategoryInfo';
import OrderInfo from './components/main/order/OrderInfo';
import OrderResetWarning from './components/main/order/OrderResetWarning';
import OrderAddress from './components/main/order/OrderAddress';
import OrderAddressMap from './deprecated/OrderAddressMap';
import OrderDone from './components/main/order/OrderDone';
import RegistryForm from './components/auth/RegistryForm';
import UserAccountMenu from './components/main/account/UserAccountMenu';
import Presentation from './components/auth/Presentation';
import UserAccountAddress from './components/main/account/UserAccountAddress';
import UserAccountAddressForm from './components/main/account/UserAccountAddressForm';
import UserAccountOrder from './components/main/account/UserAccountOrder';
import UserAccountOrderInfo from './components/main/account/UserAccountOrderInfo';

const RouterComponent = () => {
    return (
        <Router backAndroidHandler={() => true}>
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
                            key="orderAddressMap"
                            component={OrderAddressMap}
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
            </Lightbox>
        </Router>
    );
};

export default RouterComponent;
