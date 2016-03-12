import fetch from 'isomorphic-fetch';

export function fetchLoginAuth(username, password) {
  return fetch('/login/auth', {
               credentials: 'same-origin',
               method: 'post',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 username,
                 password
               })
             })
    .then(
      function onFulfillment(response) {
        if (response.status === 200) {
          return response.json();
        }
        else {
          return {
            loggedIn: false
          }
        }
      },
      function onRejection(reason) {
      }
    )
    .then(results => {
      return results;
    });
}

export function fetchLoginActive() {
  return fetch('/login/active', {
               credentials: 'same-origin',
               method: 'post',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               }
             })
    .then(response => {
      if (response.status === 200) {
        return response.json();
      }
      else {
        return {
          loggedIn: false
        }
      }
    })
    .then(results => {
      return results;
    });
}

export function fetchLogout() {
  return fetch('/login/logout', {
               credentials: 'same-origin',
               method: 'post',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               }
             })
    .then(response => response.json())
    .then(results => {
      return results;
    });
}
