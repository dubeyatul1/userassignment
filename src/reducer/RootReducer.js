import {combineReducers} from 'redux';  
import { UserReducer, UserByIdReducer } from "../reducer/UserReducer";
import { AssignmentReducer } from "../reducer/AssignmentReducer";
import { CountryReducer } from './CountryReducer';

const RootReducer = combineReducers({
    users:UserReducer,
    userProfile:UserByIdReducer,
    assignment:AssignmentReducer,
    countries:CountryReducer
  })
  
  export default RootReducer;  