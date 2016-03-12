import fetch      from 'isomorphic-fetch';

export function fetchConfig() {
  return fetch('/config')
    .then(response => response.json())
    .then(
      function fetchConfigResolved(config) {
        return config;
      },
      function fetchConfigRejected(reason) {
      }
    );
}
