
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

export const requestBookIndex = () => dispatch => (
    fetch(window.webBase+"api/books").then(payload => (
            payload.json())
    .then(json=>{
        //console.log(json);
        dispatch(receiveBooks(json));
    }),json=>{
        console.log("error")
    })
);

