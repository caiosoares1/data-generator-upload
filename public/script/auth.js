function isAuthenticated() {
    if (!getToken()) {
      window.location.href = '/Login.html';
    } else {
      return true;
    }
}
  
function getToken() {
    return localStorage.getItem('@generator:token');
}
  
function signin(token) {
  localStorage.setItem('@generator:token', token);

  window.location.href = '/Generator.html';
}
  
function signout() {
  localStorage.removeItem('@generator:token');

  window.location.href = '/signin.html';
}

export default { isAuthenticated, getToken, signin, signout }; 
