import * as ActionTypes from './ActionTypes'; 
import { baseUrl } from '../baseUrl';


export const assignmentLoading = () => ({
    type: ActionTypes.ASSIGNSMNT_LOADING
});

export const loadAssignmentSuccess = (assignments) => ({
    type: ActionTypes.LOAD_ASSIGNSMNT_SUCCESS,
    assignments
});

export const fetchAssignment = (sortBy, orderBy, skip, limit, neworder) => (dispatch) => { 
    dispatch(assignmentLoading(true));
    return fetch(baseUrl+'assignments/'+sortBy+'/'+orderBy+'/'+skip+'/'+limit+neworder)
        .then(response => response.json())
        .then(assignData => dispatch(loadAssignmentSuccess(assignData)));
}

export const countAssignmentSuccess = (count) => ({
    type: ActionTypes.ASSIGNS_COUNT,
    count
});

export const fetchAssignmentCount = (newoder) => (dispatch) => { 
    return fetch(baseUrl+'assignments/all'+newoder)
        .then(response => response.json())
        .then(count => dispatch(countAssignmentSuccess(count)));
}


