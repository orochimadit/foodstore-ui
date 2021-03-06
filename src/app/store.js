// import module dari redux
import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import authReducer from '../features/Auth/reducer';
import productReducer from '../features/Products/reducer';
// import redux-thunk middleware
import thunk from 'redux-thunk';

//buat composer enchancer untuk menghubungkan dengan chrome devtools redux
const composerEnchancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// gabung reducer , untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
    auth:authReducer,
    products:productReducer
});

//buat store, dan gunakan composerEnchancer + middleware thunk 
const store = createStore(rootReducers,composerEnchancer(applyMiddleware(thunk)));

//export store
export default store;