import { createStore, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import profile from './profile/reducers';
import myList from './my-list/reducers';
import share from './share/reducers';
 
const rootReducer = combineReducers({
  profile: profile,
  myList: myList,
  share: share,
}); 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
 
export default () => {
  let store = createStore(persistedReducer)
  let persistor = persistStore(store)
  return { store, persistor }
}