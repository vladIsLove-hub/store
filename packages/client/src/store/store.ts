import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

export type RootState = ReturnType<typeof store.getState>;
