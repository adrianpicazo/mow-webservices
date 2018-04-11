import GenericRequest, { METHOD } from './GenericRequest';

export default class WsLoginRequest extends GenericRequest {

    mPassword;
    mUsername;

    constructor(username, password) {
        super(METHOD.METHOD_POST, 'http://pedidosdomiciliotest.cuatroochenta.com/api/login');
        this.mUsername = username;
        this.mPassword = password;

        this.addHeader('Content-Type', 'application/x-www-form-urlencoded');
    }

    getRequest() {
        return {
            email: this.mUsername,
            password: this.mPassword,
        };
    }
}
