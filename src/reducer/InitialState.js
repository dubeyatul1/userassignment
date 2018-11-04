export default {  
    isLoading: true,
    users: [],
    userProfile:[],
    assignments: [],
    assignmentsCount:0,
    countries:[],
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }