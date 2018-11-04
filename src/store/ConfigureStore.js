import {createStore, combineReducers, applyMiddleware} from 'redux';  
import RootReducer from '../reducer/RootReducer';  
import thunk from 'redux-thunk';



export default () => {
    const store = createStore(
      combineReducers({
        users: RootReducer,
        userProfile:RootReducer,
        assignments:RootReducer,
        countries:RootReducer
      }),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
      applyMiddleware(thunk)
    );
  
    return store;
  };