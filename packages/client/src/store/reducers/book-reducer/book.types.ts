import { Book } from 'src/components/booklist/BookListTypes';

export enum BookActionTypes {
  FETCH_BOOKS = 'FETCH_BOOKS',
  FETCH_BOOKS_SUCCESS = 'FETCH_BOOKS_SUCCESS',
  FETCH_BOOKS_ERROR = 'FETCH_BOOKS_ERROR',
  CLEAR_ERROR_IN_STATE = 'CLEAR_ERROR_IN_STATE',
  SET_PAGINATION_DATA = 'SET_PAGINATION_DATA',
  SET_SORT_DATA = 'SET_SORT_DATA',
  CLEAR_SORT_DATA = 'CLEAR_SORT_DATA',
  ADD_RESET_HANLDER = 'ADD_RESET_HANLDER',
  SET_SEARCH_DATA = 'SET_SEARCH_DATA',
  CLEAR_SEARCH_DATA = 'CLEAR_SEARCH_DATA',
}

export interface BookState {
  books: Book[];
  loading: boolean;
  error: null | string;
  currentPage: number;
  totalPages: number;
  totalBookCount: number | null;
  sortOptions: string;
  search: string;
}

interface FetchBooksAction {
  type: BookActionTypes.FETCH_BOOKS;
}

interface FetchBooksActionSuccess {
  type: BookActionTypes.FETCH_BOOKS_SUCCESS;
  payload: Book[];
}

interface FetchBooksErrorAction {
  type: BookActionTypes.FETCH_BOOKS_ERROR;
  payload: string;
}

interface ClearErrorInState {
  type: BookActionTypes.CLEAR_ERROR_IN_STATE;
}

interface SetPaginationData {
  type: BookActionTypes.SET_PAGINATION_DATA;
  payload: {
    totalPages: number;
    currentPage: number;
    totalCount: number;
  };
}

interface SetSortData {
  type: BookActionTypes.SET_SORT_DATA;
  payload: string;
}

interface ClearSortData {
  type: BookActionTypes.CLEAR_SORT_DATA;
}

interface SetSearchData {
  type: BookActionTypes.SET_SEARCH_DATA;
  payload: string;
}

interface ClearSearchData {
  type: BookActionTypes.CLEAR_SEARCH_DATA;
}

export type BookAction =
  | FetchBooksErrorAction
  | FetchBooksActionSuccess
  | FetchBooksAction
  | ClearErrorInState
  | SetPaginationData
  | SetSortData
  | ClearSortData
  | SetSearchData
  | ClearSearchData;
