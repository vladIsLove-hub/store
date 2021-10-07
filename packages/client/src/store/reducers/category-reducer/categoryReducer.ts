import getCategoryNameFromURL from '../../../utils/getCategoryNameFromURL';

import { CategoryActionTypes, CategoryAction, CategoryState } from './category.types';

const initialState: CategoryState = {
  categories: [],
  currentCategoryName: getCategoryNameFromURL(),
};

const categoryReducer = (state = initialState, action: CategoryAction): CategoryState => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      };
    case CategoryActionTypes.SET_CATEGORY_NAME:
      return {
        ...state,
        currentCategoryName: action.payload,
      };
    case CategoryActionTypes.CLEAR_CATEGORY_NAME:
      return {
        ...state,
        currentCategoryName: null,
      };
    default:
      return state;
  }
};

export default categoryReducer;
