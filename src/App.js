import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import ReduxThunk from 'redux-thunk';
import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import reducers from './reducers';
import Router from './Router';

export const analyticsTracker = new GoogleAnalyticsTracker('UA-117937530-1');

class App extends Component {

    componentWillMount() {
        Reactotron
            .configure()
            .useReactNative()
            .use(reactotronRedux())
            .configure({ host: '192.168.5.114' })
            .connect();
    }

    render() {
        const store = Reactotron.createStore(reducers, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
