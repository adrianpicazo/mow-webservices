/**
const loginUser = ({ email, password }) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER_START });


         const body = `json=${JSON.stringify({
            email,
            password
        })}`;

         fetch(
         URL.concat('login'),
         {
             method: 'POST',
             headers: HEADER,
             body,
         }
         ).then(response => response.json())
         .catch(error => loginUserFail(dispatch, error))
         .then(response => loginUserSuccess(dispatch, response));
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: response.token
    });
    Actions.push('main');
};
 */
