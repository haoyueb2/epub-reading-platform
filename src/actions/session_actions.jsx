
import { receiveErrors } from './error_actions';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const login = user => dispatch => (
    fetch(proxyurl+"https://awesomereaders.herokuapp.com/api/sessions",{
        method: 'POST',
        body: JSON.stringify(user)
    }).then(user => (
        dispatch(receiveCurrentUser(user))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);



