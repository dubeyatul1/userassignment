import * as ActionTypes from '../action/ActionTypes';
import InitialState from './InitialState';

export const CountryReducer = (state = InitialState.countries, action) => {
    switch(action.type) {
      case ActionTypes.LOAD_COUNTRIES_SUCCESS:
        return {...state, isLoading: false, countries: action.countries};
      case ActionTypes.COUNTRIES_LOADING:
        return {...state, isLoading: true, errMess: null, countries: []}  
      default: 
        return state;
    }
   
  }