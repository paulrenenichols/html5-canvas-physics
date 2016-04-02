import fetch from 'isomorphic-fetch';

export function postLog(logObject) {
  return fetch('/logger', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(logObject)
  })
  .catch(function () {
    return true;
  });
}
