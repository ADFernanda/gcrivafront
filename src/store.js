import { createStore, applyMiddleware, combineReducers } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import rootReducer from './reducers';
import thunk from 'redux-thunk';

const createStoreWithMiddleware = applyMiddleware(thunk, apiMiddleware)(createStore);

export default (initialState) => {
    return createStoreWithMiddleware(rootReducer, initialState);
}
