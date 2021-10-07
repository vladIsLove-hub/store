import { BookActionTypes, BookAction, BookState } from './book.types';

const initialState: BookState = {
  books: [],
  loading: true,
  error: null,
  currentPage: 1,
  totalPages: 0,
  totalBookCount: null,
  sortOptions: '',
  search: '',
};

const bookReducer = (state = initialState, action: BookAction): BookState => {
  switch (action.type) {
    case BookActionTypes.FETCH_BOOKS:
      return {
        ...state,
        loading: true,
      };
    case BookActionTypes.FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case BookActionTypes.FETCH_BOOKS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case BookActionTypes.CLEAR_ERROR_IN_STATE:
      return {
        ...state,
        error: null,
      };
    case BookActionTypes.SET_PAGINATION_DATA:
      return {
        ...state,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        totalBookCount: action.payload.totalCount,
      };
    case BookActionTypes.SET_SORT_DATA:
      return {
        ...state,
        sortOptions: action.payload,
      };
    case BookActionTypes.CLEAR_SORT_DATA:
      return {
        ...state,
        sortOptions: '',
      };
    case BookActionTypes.SET_SEARCH_DATA:
      return {
        ...state,
        search: action.payload,
      };
    case BookActionTypes.CLEAR_SEARCH_DATA:
      return {
        ...state,
        search: '',
      };
    default:
      return state;
  }
};

export default bookReducer;
