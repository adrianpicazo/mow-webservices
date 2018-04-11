
import * as _ from "lodash";
export var METHOD;
(function (METHOD) {
    METHOD["METHOD_POST"] = "POST";
    METHOD["METHOD_GET"] = "GET";
    METHOD["METHOD_PUT"] = "PUT";
    METHOD["METHOD_DELETE"] = "DELETE";
})(METHOD || (METHOD = {}));
/**
 * Class that makes a simple HTTP request.
 *
 * Usage:
 * 1 - Extend this class
 *
 * 2 - Create the constructor calling super(METHOD, URL, DEFAULT_ERROR_MESSAGE)
 *   * METHOD: Constant String that can be METHOD_POST, METHOD_GET, METHOD_PUT, METHOD_DELETE
 *   * URL: String pointing to the WS address
 *   * DEFAULT_ERROR_MESSAGE: String that is going to be passed to the onFail() method whenever any unexpected error happens.
 *
 * 2.5 - Additional methods that can be used in the constructor:
 *   * this.addHeader(String, String): Pair String value that is going to be added to the request header.
 *   * this.setErrorMessage(Number, String): Error message that is going to be returned in the onFail() callback if the server response is the number defined in the pair.
 *
 * 3 - Override the method overrideRequest() returning a jsonObject
 *
 * 4 - Instantiate the created object with new Child() and define its callbacks:
 *   * .onPreExecution(() => void): Callback that is going to be executed before anything else.
 *   * .onSuccess(Object => void): Callback that is going to be executed whenever the server returns a 200 code. The object returned is a json representation of the server response.
 *   * .onFail(String => void): Callback that is going to be executed whenever the server returns a code that is not 200 or any other exception occurred. The String contains the message why it failed.
 *   * .onPostExecution(() => void): Callback that is going to be executed once the request is completed, whether it failed or succeeded.
 *
 * 5 - Call execute() to send the request.
 *
 * @abstract
 * @virtual
 */
export default class GenericRequest {
    constructor(method = METHOD.METHOD_POST, url, generalErrorMessage) {
        this.warn = console.warn;
        this.log = console.log;
        this.headers = {};
        this.log_only_request = true;
        this.log_only_response = true;
        this.generalErrorMessage = generalErrorMessage;
        this.errorMessages = {};
        this.method = method;
        this.url = url;
        this.addHeader = this.addHeader.bind(this);
        this.success = this.success.bind(this);
        this.execute = this.execute.bind(this);
        this.error = this.error.bind(this);
    }
    /**
     * Fail inner management.
     *
     * @param error
     * @param errorCode
     * @instance
     */
    error(error, errorCode) {
        this.log(`RESPONSE: FAIL[${this.constructor.name}]`);
        this.log(`Error ${error.stack}`);
        if (error.stack) {
            this.warn(error.message);
            if (this.failFunction)
                this.failFunction("");
        }
        else if (errorCode && this.errorMessages[errorCode]) {
            this.warn(`CODE ${errorCode}`, this.errorMessages[errorCode]);
            if (this.failFunction) {
                this.failFunction(this.errorMessages[errorCode]);
            }
        }
        else if (errorCode) {
            this.warn(`CODE ${errorCode}`);
            if (this.failFunction) {
                this.failFunction(errorCode.toString());
            }
        }
        else if (error.hasOwnProperty("_bodyText")) {
            this.warn(`ERROR ${JSON.stringify(error._bodyText)}`);
            if (this.failFunction) {
                this.failFunction(error._bodyText);
            }
        }
    }
    /**
     * Success inner management.
     *
     * @param response
     * @instance
     */
    success(response) {
        if (response.status !== 200)
            this.error(response, response.status);
        else {
            let responseObj = JSON.parse(response._bodyText || "{}");
            if (_.isArray(responseObj))
                responseObj = { array: responseObj };
            this.log(`RESPONSE: SUCCESS[${this.constructor.name}]`);
            this.log(`CODE ${response.status}`);
            if (this.log_only_response) {
                this.log("BODY");
                this.log(JSON.stringify(responseObj, null, 2));
            }
            if (this.successFunction)
                this.successFunction(responseObj);
        }
    }
    enableLogs(enable) {
        if (enable) {
            this.log = console.log;
            this.warn = console.warn;
        }
        else {
            this.log = () => null;
            this.warn = () => null;
        }
    }
    enableRequestLog(enable) {
        this.log_only_request = enable;
    }
    enableResponseLog(enable) {
        this.log_only_response = enable;
    }
    addHeader(key, value) {
        this.headers[key] = value;
    }
    setErrorMessage(code, message) {
        this.errorMessages[code] = message;
    }
    /**
     * Callback that is going to be executed before anything else.
     *
     * @param onPreExecutionFunction The callback.
     * @returns {this} This class allowing to chain callbacks.
     */
    onPreExecution(onPreExecutionFunction) {
        this.onPreExecutionFunction = onPreExecutionFunction;
        return this;
    }
    /**
     * Callback that is going to be executed once the request is completed, whether it failed or succeeded.
     *
     * @param onPostExecutionFunction The callback.
     * @returns {this} This class allowing to chain callbacks.
     */
    onPostExecution(onPostExecutionFunction) {
        this.onPostExecutionFunction = onPostExecutionFunction;
        return this;
    }
    /**
     * Callback that is going to be executed whenever the server returns a 200 code. The object returned is a json representation of the server response.
     *
     * @param successFunction The callback
     * @returns {this} This class allowing to chain callbacks.
     */
    onSuccess(successFunction) {
        this.successFunction = successFunction;
        return this;
    }
    /**
     * Callback that is going to be executed whenever the server returns a code that is not 200 or any other exception occurred. The String contains the message why it failed.
     *
     * @param failFunction The callback
     * @returns {GenericRequest} This class allowing to chain callbacks.
     */
    onFail(failFunction) {
        this.failFunction = failFunction;
        return this;
    }
    /**
     * Finish and send the request.
     */
    execute() {
        if (this.onPreExecutionFunction)
            this.onPreExecutionFunction();
        const request = this.getRequest();
        this.logRequest(request);
        fetch(this.url, {
            method: this.method,
            headers: this.headers,
            body: this.method === METHOD.METHOD_GET ? null : request instanceof FormData ? request : JSON.stringify(request || "{}"),
        }).then(this.success)
            .catch(this.error)
            .then(() => this.onPostExecutionFunction && this.onPostExecutionFunction());
    }
    /**
     * Logs the request
     * @param request
     * @instance
     */
    logRequest(request) {
        this.log(`REQUEST: ${this.method}[${this.constructor.name}]`);
        this.log(`URL ${this.url}`);
        this.log("HEADERS");
        this.log(JSON.stringify(this.headers || "{}", null, 2));
        if (this.log_only_request) {
            this.log("BODY");
            this.log(JSON.stringify(request || "{}", null, 2));
        }
    }
}
