import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'react-native-firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
    componentWillMount() {
        const config = {
            apiKey: 'AIzaSyCw6yYQELWGtyzIOkFiO-ONSUY6pZ8gbcE',
            authDomain: 'mealsonwheels-2daf0.firebaseapp.com',
            databaseURL: 'https://mealsonwheels-2daf0.firebaseio.com',
            projectId: 'mealsonwheels-2daf0',
            storageBucket: 'mealsonwheels-2daf0.appspot.com',
            messagingSenderId: '988825721106'
        };

        firebase.initializeApp(config);
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
