export function delayedRejectionPromise(delay) {
  return new Promise(function executor(resolve, reject) {
    setTimeout(function timeoutHandler() {
      reject(`delayedRejectionPromise timed out after ${delay}ms`);
    }, delay);
  });
}

export function delayedFulfillmentPromise(delay) {
  return new Promise(function executor(resolve, reject) {
    setTimeout(function timeoutHandler() {
      resolve(`delayedFulfillmentPromise resolved after ${delay}ms`);
    }, delay);
  });
}
