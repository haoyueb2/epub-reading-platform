import { combineReducers } from 'redux';
import SessionReducer from './session_reducer';
import BooksReducer from './book_reducer';
import ErrorReducer from './error_reducer';


const rootReducer = combineReducers({
    session: SessionReducer,
    books: BooksReducer,
    errors: ErrorReducer,
});

export default rootReducer;
