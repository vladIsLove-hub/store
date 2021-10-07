import { Dispatch } from 'redux';
import axios from 'axios';

import { BookAction, BookActionTypes } from '../reducers/book-reducer/book.types';
import { CategoryAction } from '../reducers/category-reducer/category.types';

import { Book } from 'src/components/booklist/BookListTypes';

import { setError } from './exception.actions';
import { simpleSetPaginationData } from './pagination.actions';
import { booksApiPath } from './../../utils/consts';
import { clearCategoryName } from './category.actions';

type Actions = BookAction | CategoryAction;

const startFetchBooks = (dispatch: Dispatch<Actions>): void => {
  dispatch({ type: BookActionTypes.FETCH_BOOKS });
};

const fetchBooksSuccess = (dispatch: Dispatch<Actions>, books: Book[]) => {
  dispatch({ type: BookActionTypes.FETCH_BOOKS_SUCCESS, payload: books });
};

export const fetchBooks = async (
  dispatch: Dispatch<Actions>,
  currentPage = 1,
  sortOptions?: string,
  search?: string,
) => {
  startFetchBooks(dispatch);
  clearCategoryName(dispatch);
  await axios
    .get(booksApiPath, {
      params: {
        search: search?.trim() ?? '',
        page: currentPage,
        sortData: sortOptions ?? '',
      },
    })
    .then(resp => {
      const { books, page, totalPages, totalCount } = resp.data;
      simpleSetPaginationData(dispatch, totalPages, page, totalCount);
      fetchBooksSuccess(dispatch, books);
    })
    .catch(e => {
      const { message } = e.response.data;
      setError(dispatch, message);
    });
};

export const fetchBooksByCategoryName = async (
  dispatch: Dispatch<Actions>,
  categoryName: string,
  currentPage = 1,
  sortOptions?: string,
) => {
  startFetchBooks(dispatch);
  await axios
    .get(booksApiPath, {
      params: {
        page: currentPage,
        category: categoryName,
        sortData: sortOptions ?? '',
      },
    })
    .then(resp => {
      const { books, page, totalPages, totalCount } = resp.data;
      simpleSetPaginationData(dispatch, totalPages, page, totalCount);
      fetchBooksSuccess(dispatch, books);
    })
    .catch(e => {
      const { message } = e.response.data;
      setError(dispatch, message);
    });
};

export const fetchBookById = async (id: string, dispatch: Dispatch<BookAction>): Promise<Book | void> => {
  return await axios
    .get(`${booksApiPath}/${id}`)
    .then(async resp => {
      const book: Book = await resp.data;
      return book;
    })
    .catch(e => {
      const { message } = e.response.data;
      setError(dispatch, message);
    });
};
