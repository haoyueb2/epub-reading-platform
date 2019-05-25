
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const RECEIVE_ONE_BOOK = 'RECEIVE_ONE_BOOK';
export const receiveBooks = book => ({
    type: RECEIVE_BOOKS,
    book
});
export const receiveOneBook = book => {
    return (
        {
            type: RECEIVE_ONE_BOOK,
            book
        }
    );
};
const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const requestBookIndex = () => dispatch => (
    fetch(proxyurl+"https://awesomereaders.herokuapp.com/api/books").then(payload => (
            payload.json())
    .then(json=>{
        //console.log(json);
        dispatch(receiveBooks(json));
    }))
);
export const requestBook = id => dispatch => (
    fetch(proxyurl+"https://awesomereaders.herokuapp.com/api/books/"+id).then(payload => (
        dispatch(receiveOneBook(payload))
    ))
);