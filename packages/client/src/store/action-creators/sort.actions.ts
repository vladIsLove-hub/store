import { Dispatch } from 'redux';

import { BookAction, BookActionTypes } from '../reducers/book-reducer/book.types';

export const setSortData = (dispatch: Dispatch<BookAction>, sortOptions: string) => {
  dispatch({ type: BookActionTypes.SET_SORT_DATA, payload: sortOptions });
};

export const clearSortData = (dispatch: Dispatch<BookAction>) => {
  dispatch({ type: BookActionTypes.CLEAR_SORT_DATA });
};
