export const auth = () => {
    let token = localStorage.getItem('access_token') || null;
    if(token) {
        return true ;
      }
      else {
        window.location = '/login';
        throw "No token saved!"
      }
}
  
