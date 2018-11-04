import * as ActionTypes from '../action/ActionTypes';
import InitialState from './InitialState';

export const UserReducer = (state = InitialState.users, action) => {
    switch(action.type) {
      case ActionTypes.LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
      case ActionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: ''
      })
    case ActionTypes.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case ActionTypes.LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
    })     
    case ActionTypes.LOAD_USERS_SUCCESS:
      return {...state, isLoading: false, data: action.users};
    case ActionTypes.USERS_LOADING:
      return {...state, isLoading: true, errMess: null, users: []}   
    case ActionTypes.USER_REMOVE:  
    console.log(state.data)  
      return {...state, isLoading: false, data: state.data.filter((val) => val._id !== action.id)};   
    default: 
      return state;
    }   
  }

  export const UserByIdReducer = (state = InitialState.userProfile, action) =>{
    switch(action.type) {
      case ActionTypes.USER_LOADING:
      return {...state, isLoading: true, data: []};
    case ActionTypes.LOAD_USER_SUCCESS:
      return {...state, isLoading: false, data: action.userProfile};
    default: 
      return state;
    }    
  }