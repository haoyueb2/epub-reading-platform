
export const RECEIVE_BOOKS = 'RECEIVE_BOOKS';
export const RECEIVE_ONE_BOOK = 'RECEIVE_ONE_BOOK';
export const RECEIVE_COMMENT= 'RECEIVE_COMMENT';
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
export const receiveComment = comment => ({
    type: RECEIVE_COMMENT,
    comment
});
//proxyurl+"https://awesomereaders.herokuapp.com/api/books"
const proxyurl = "https://cors-anywhere.herokuapp.com/";
export const requestBookIndex = () => dispatch => (
    fetch("books.json").then(payload => (
            payload.json())
    .then(json=>{
        //console.log(json);
        dispatch(receiveBooks(json));
    }),json=>{
        console.log("error")
    })
);
export const requestBook = id => dispatch => (
    fetch(proxyurl+"https://awesomereaders.herokuapp.com/api/books/"+id).then(payload => (
        payload.json())
        .then(json=>{
            //console.log(json);
            dispatch(receiveOneBook(json));
        }))
);
export const requestComment = (book_id) => dispatch => (
    fetch("api/comment/"+ book_id ).then(payload => (
        payload.json())
        .then(json=>{
            console.log(json);
            dispatch(receiveComment(json));
        }),json=>{
        console.log("error")
    })
);