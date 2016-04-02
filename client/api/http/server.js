import fetch                        from 'isomorphic-fetch';
import Util                         from '../util/index';
const  { delayedRejectionPromise }  = Util.Promises;

export function fetchApplicationServerPing() {
  var pingFetch = fetch('/ping', {
               credentials: 'same-origin',
               method: 'get',
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               }
             })
    .then(
      function onFulfillment(response) {
        if (response && response.status !== 200) {
          throw new Error(`Application Server Ping Bad Status ${response.status}`);
        }

        return response;
      }
    );

  return Promise.race([pingFetch, delayedRejectionPromise(3000)]);
}

export function testFetchApplicationServerPing() {
  fetchApplicationServerPing()
    .then(
      function onFulfillment(result) {
        console.log(`server ping successful ${JSON.stringify(result, null, 2)}`);
      },
      function onRejection(reason)  {
        console.log(`server ping FAIL ${reason}`);
      }
    );
}
