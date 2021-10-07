import React, { ChangeEvent, Dispatch } from 'react';
import axios from 'axios';

import { BookAction, BookActionTypes } from '../reducers/book-reducer/book.types';

import { booksApiPath } from './../../utils/consts';

export const setSearchData = (dispatch: Dispatch<BookAction>, search: string): void => {
  dispatch({ type: BookActionTypes.SET_SEARCH_DATA, payload: search });
};

export const clearSearchData = (dispatch: Dispatch<BookAction>): void => {
  dispatch({ type: BookActionTypes.CLEAR_SEARCH_DATA });
};

export const searchChangeHandler = async <T>(
  e: ChangeEvent<HTMLInputElement>,
  setBooksCallback: React.Dispatch<React.SetStateAction<T | []>>,
) => {
  const searchValue = e.target.value.trim();

  if (!searchValue) {
    setBooksCallback([]);
    return;
  }

  const response = await axios.get(booksApiPath, {
    params: {
      search: searchValue,
    },
  });

  setBooksCallback(response.data.books);
};
