import firebase from 'react-native-firebase';
import {
    USER_ACCOUNT_FETCH_SUCCESS
} from './types';

export const userAccountFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/account`)
            .on('value', snapshot => {
                dispatch({
                    type: USER_ACCOUNT_FETCH_SUCCESS,
                    payload: snapshot.val()
                });
            });
    };
};
