import * as ActionTypes from '../action/ActionTypes';
import InitialState from './InitialState';

export const AssignmentReducer = (state = InitialState.assignments, action) => {
    switch(action.type) {
      case ActionTypes.LOAD_ASSIGNSMNT_SUCCESS:
        return {...state, isLoading: false, data: action.assignments};
      case ActionTypes.ASSIGNSMNT_LOADING:
        return {...state, isLoading: true, errMess: null, assignments: []}  
      case ActionTypes.ASSIGNS_COUNT:
        return {...state, isLoading: true, errMess: null, assgnCount:action.count}  
      default: 
        return state;
    }
   
  }