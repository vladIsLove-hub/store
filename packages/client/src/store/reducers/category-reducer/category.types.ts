import { Category } from 'src/components/nav/NavTypes';

export enum CategoryActionTypes {
  FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS',
  FETCH_CATEGORY_ERROR = 'FETCH_CATEGORY_ERROR',
  SET_CATEGORY_NAME = 'SET_CATEGORY_NAME',
  CLEAR_CATEGORY_NAME = 'CLEAR_CATEGORY_NAME',
}

export interface CategoryState {
  categories: Category[];
  currentCategoryName: string | null;
}

interface SetCategoryName {
  type: CategoryActionTypes.SET_CATEGORY_NAME;
  payload: string;
}

interface ClearCategoryName {
  type: CategoryActionTypes.CLEAR_CATEGORY_NAME;
}

interface FetchCategorySuccess {
  type: CategoryActionTypes.FETCH_CATEGORY_SUCCESS;
  payload: Category[];
}

export type CategoryAction = SetCategoryName | ClearCategoryName | FetchCategorySuccess;
