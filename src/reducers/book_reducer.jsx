import { RECEIVE_BOOKS, RECEIVE_ONE_BOOK } from '../actions/book_actions';
import { merge } from 'lodash';

const BooksReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_BOOKS:
            //console.log(merge({}, state, action.book));
            return merge({}, state, action);
        case RECEIVE_ONE_BOOK:
            return merge({}, state, { [action.book.id]: action.book } );
        default:
            return state;
    }
};

export default BooksReducer;