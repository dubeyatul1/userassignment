import * as ActionTypes from "./ActionTypes";
import Axios from "axios";
import { baseUrl } from "../baseUrl";

const auth = authenticated => {
  let token = localStorage.getItem("access_token") || null;
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        headers: { Authorization: `${token}` } //`Bearer ${token}`
      };
    } else {
      window.location = "/login";
      throw "No token saved!";
    }
  }
};

export const userLoading = () => ({
  type: ActionTypes.USERS_LOADING
});

export const loadUserSuccess = users => ({
  type: ActionTypes.LOAD_USERS_SUCCESS,
  users
});

//Fetch all users
export const fetchUsers = () => dispatch => {
  dispatch(userLoading());
  auth(true);
  return fetch(baseUrl + "users")
    .then(response => response.json())
    .then(users => dispatch(loadUserSuccess(users)));
};

//Fetch User by id

export const userByIdLoading = () => ({
  type: ActionTypes.USER_LOADING
});

export const userByIdSuccess = userProfile => ({
  type: ActionTypes.LOAD_USER_SUCCESS,
  userProfile
});

export const fetchUserById = userId => dispatch => {
  dispatch(userByIdLoading());
  auth(true);
  return fetch(baseUrl + "users/user/" + userId)
    .then(response => response.json())
    .then(userProfile => dispatch(userByIdSuccess(userProfile)));
};

//Delete Users by ID
export const deletUserByIdSuccess = id => ({
  type: ActionTypes.USER_REMOVE,
  id
});

export const deleteUserById = userId => dispatch => {
  auth(true);
  return fetch(baseUrl + "users/user/" + userId, {
    method: "delete"
  })
    .then(response => response.json())
    .then(userProfile => dispatch(deletUserByIdSuccess(userProfile._id)));
};

export const createUserSuccess = newUser => ({
  type: ActionTypes.CREATE_USERS_SUCCESS,
  newUser
});

export const createUsers = user => { 
  return dispatch => {
    return Axios.post(baseUrl + "users/signup", user)
      .then(response => {
        // Dispatch a synchronous action
        // to handle data
        dispatch(createUserSuccess(response.data));
      })
      .catch(error => {
        throw error;
      });
  };
};

//Update user
/**
 * 
 * @param {user id} id 
 */

export const updateUserByIdSuccess = userProfile => ({
  type: ActionTypes.USER_UPDATE,
  userProfile
});


/**
 * 
 * @param {User ID} userId 
 * @param {Form field to update} data 
 */
export const updateUser = (userId,data, lastImage) => dispatch => {
  auth(true);
  return fetch(baseUrl + "users/user/" + userId, {
    method: "put",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "profile" :  data
    })
  })
  .then(response => response.json())
  .then(userProfile => dispatch(updateUserByIdSuccess(userProfile)))
  .then(() => deletFile(lastImage));
};

const deletFile = (fileName) => {
  return fetch(baseUrl + "uploadfile/file/" + fileName, {
    method: "delete"
  });
  // console.log(9879878);
}
const requestLogin = creds => {
  return {
    type: ActionTypes.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
};

const receiveLogin = user => {
  return {
    type: ActionTypes.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  };
};

const loginError = message => {
  return {
    type: ActionTypes.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  };
};

export const loginUser = creds => {
  let config = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `email=${creds.email}&password=${creds.password}`
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));

    return fetch(baseUrl + "users/login", config)
      .then(response => response.json().then(user => ({ user, response })))
      .then(({ user, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(user.message));
          return Promise.reject(user);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem("id_token", user.token);
          localStorage.setItem("access_token", user.token);
          // Dispatch the success action
          dispatch(receiveLogin(user));
          window.location = "/";
        }
      })
      .catch(err => console.log("Error: ", err));
  };
};

const requestLogout = () => {
  return {
    type: ActionTypes.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
};

const receiveLogout = () => {
  return {
    type: ActionTypes.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
};

// Logs the user out
export const logoutUser = () => {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem("id_token");
    localStorage.removeItem("access_token");
    dispatch(receiveLogout());
    window.location = "/login";
  };
};
