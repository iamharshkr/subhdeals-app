import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  dealsReducer,
  getMoreDealsReducer,
  productDetailsReducer,
  searchReducer,
} from './src/reducers/dealsReducer';
import {storeReducer} from './src/reducers/storeReducer';
import {themeReducer} from './src/reducers/themeReducer';

const reducer = combineReducers({
  deals: dealsReducer,
  productDetails: productDetailsReducer,
  moreDeals: getMoreDealsReducer,
  search: searchReducer,
  store: storeReducer,
  theme: themeReducer,
});

let initialState = {
  theme: {
    darkMode: false,
  },
};

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);

const middleware = [thunk];

const store = createStore(
  persistedReducer,
  initialState,
  applyMiddleware(...middleware),
);
export const persistor = persistStore(store);
export default store;
