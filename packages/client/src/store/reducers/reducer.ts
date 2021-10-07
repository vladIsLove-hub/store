import { combineReducers } from 'redux';

import bookReducer from './book-reducer/bookReducer';
import categoryReducer from './category-reducer/categoryReducer';
import sidebarReducer from './sidebar-reducer/sidebarReducer';

const rootReducer = combineReducers({
  bookState: bookReducer,
  categoryState: categoryReducer,
  sidebarState: sidebarReducer,
});

export default rootReducer;
