
import { receiveErrors } from './error_actions';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const proxyurl = "https://cors-anywhere.herokuapp.com/";

export const logout = () => ({
    type:'LOGOUT'
})

export const login = user => dispatch => (
    fetch( "/api/session", {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(user)
    }).then(res=>res.json()).then(json => (
        dispatch(receiveCurrentUser(json))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const register = user => dispatch => (
    fetch( "/api/user", {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        body: JSON.stringify(user)
    }).then(res=>res.json()).then(json => (
        dispatch(receiveCurrentUser(json))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);



