import axios from 'axios';
import { Dispatch } from 'redux';

import { BookAction, BookActionTypes } from '../reducers/book-reducer/book.types';

import { booksApiPath } from 'src/utils/consts';

import { setError } from './exception.actions';

export const simpleSetPaginationData = (
  dispatch: Dispatch<BookAction>,
  totalPages: number,
  currentPage: number,
  totalCount: number,
) => {
  dispatch({ type: BookActionTypes.SET_PAGINATION_DATA, payload: { totalPages, currentPage, totalCount } });
};

export const setPaginationData = async (dispatch: Dispatch<BookAction>, currentPage: number, categoryName?: string) => {
  return await axios
    .get(booksApiPath, {
      params: {
        category: categoryName,
        page: currentPage,
      },
    })
    .then(resp => {
      const { page, totalPages, totalCount } = resp.data;
      simpleSetPaginationData(dispatch, totalPages, page, totalCount);
    })
    .catch(e => {
      const { message } = e.response.data;
      setError(dispatch, message);
    });
};
