export const getAllUsers = () =>{
    return fetch('http://localhost:8100/users/').then(response => {
        return response.json();
      }).catch(error => {
        return error;
      });
}