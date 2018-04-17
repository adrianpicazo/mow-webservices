import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {

    componentWillMount() {
        Reactotron
            .configure() // controls connection & communication settings
            .useReactNative() // add all built-in react native plugins
            .use(reactotronRedux()) //  <- here i am!
            .configure({ host: '192.168.5.106' })
            .connect(); // let's connect!
    }

    render() {
        const store = Reactotron.createStore(reducers, applyMiddleware(ReduxThunk));
        // const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

export default App;
