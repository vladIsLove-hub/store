import { Dispatch } from 'redux';
import axios from 'axios';

import { CategoryAction, CategoryActionTypes } from '../reducers/category-reducer/category.types';

export const fetchCategories = async (dispatch: Dispatch<CategoryAction>) => {
  const response = await axios.get(`/api/categories`);
  dispatch({ type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS, payload: response.data });
};

export const setCategoryName = (dispatch: Dispatch<CategoryAction>, categoryName: string) => {
  dispatch({ type: CategoryActionTypes.SET_CATEGORY_NAME, payload: categoryName });
};

export const clearCategoryName = (dispatch: Dispatch<CategoryAction>) => {
  dispatch({ type: CategoryActionTypes.CLEAR_CATEGORY_NAME });
};
