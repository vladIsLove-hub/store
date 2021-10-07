import { Dispatch } from 'redux';

import { BookAction, BookActionTypes } from '../reducers/book-reducer/book.types';

export const setError = (dispatch: Dispatch<BookAction>, message: string) => {
  dispatch({
    type: BookActionTypes.FETCH_BOOKS_ERROR,
    payload: message,
  });
};

export const clearErrorInState = (dispatch: Dispatch<BookAction>): void => {
  dispatch({
    type: BookActionTypes.CLEAR_ERROR_IN_STATE,
  });
};
