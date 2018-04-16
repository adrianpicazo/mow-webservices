import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import OneSignal from 'react-native-onesignal';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.warn('Notification received: ', notification);
    }

    onOpened(openResult) {
        console.warn('Message: ', openResult.notification.payload.body);
        console.warn('Data: ', openResult.notification.payload.additionalData);
        console.warn('isActive: ', openResult.isAppInFocus);
        console.warn('openResult: ', openResult);
    }

    onIds(device) {
        console.warn('Device info: ', device);
    }

    render() {
        const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
