import { RECEIVE_BOOKS, RECEIVE_ONE_BOOK,RECEIVE_COMMENT } from '../actions/book_actions';
import { merge } from 'lodash';


const BooksReducer = (state = null, action) => {
    switch (action.type) {
        case RECEIVE_BOOKS:
            //console.log(merge({}, state, action.book));
            return merge({}, state, action.book);
        case RECEIVE_ONE_BOOK:
            return merge({}, state, { [action.book.id]: action.book } );

        default:
            return state;
    }
};

export default BooksReducer;
