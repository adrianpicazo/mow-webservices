import { AsyncStorage } from 'react-native';

export const AUTH_DATA = 'AUTH_DATA';

const getAsyncItem = (key) => new Promise((resolve, reject) => {
    AsyncStorage.getItem(key.toString(), (error, result) => {
        if (error)
            reject(error);
        else
            resolve(JSON.parse(result));
    });
});

const saveAsyncItem = (key, value) => new Promise((resolve, reject) => {
    AsyncStorage.setItem(key.toString(), JSON.stringify(value), (error) => {
        if (error)
            reject(error);
        else
            resolve();
    });
});

export default {
    get: (key) => getAsyncItem(key),
    set: (key, value) => saveAsyncItem(key, value),
    delete: (key) => AsyncStorage.removeItem(key.toString()),
};
