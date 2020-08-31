export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_COMPLETED = 'REQUEST_COMPLETED';
export const UPDATE_NET_INFO = 'UPDATE_NET_INFO';
export const CURRENT_LOCATION = 'CURRENT_LOCATION';

export function requestStarted() {
  return {
    type: REQUEST_STARTED,
  };
}

export function requestCompleted() {
  return {
    type: REQUEST_COMPLETED,
  };
}

export function setNetInfo(isConnected) {
  return {
    type: UPDATE_NET_INFO,
    payload: isConnected,
  };
}

export function setCurrentLocation(location) {
  return {
    type: CURRENT_LOCATION,
    payload: location,
  };
}
