import { values } from 'lodash';

export const selectAllBooks = (books) => {
    return values(books);
};