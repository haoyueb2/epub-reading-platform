import { RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/error_actions';
import { merge } from 'lodash';

const ErrorsReducer = (state = [], action) => {

    switch (action.type) {
        case RECEIVE_ERRORS:
            return merge({}, state, action.errors);
        case CLEAR_ERRORS:
            return [];
        default:
            return state;
    }

};

export default ErrorsReducer;
