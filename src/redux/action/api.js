import axios from 'axios';
import config from '../config';
var axioInstance = axios.create();
// // const netInfo = useNetInfo();

// // Override timeout default for the library
// // Now all requests will wait 12 seconds before timing out
axioInstance.defaults.timeout = 200000;
axioInstance.defaults.headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const postGetToken = async (url, body, header) => {
  try {
    axioInstance.defaults.headers = header;
    const response = await axioInstance.post(url, body);
    try {
      return {error: null, response};
    } catch (error) {
      return {error: error, response: null};
    }
  } catch (error) {}
};

export const checkStatus = response => {
  if (response.status !== 200) {
    const error = new Error(response.statusText);
    error.response = response;
    error.statusCode = response.status;
    throw error;
  }
  return response;
};

export function postWithoutToken(nodeURL, data, dispatch) {
  return new Promise(async (resolve, reject) => {
    axioInstance
      .post(config.SERVER_URL + nodeURL, JSON.stringify(data))
      .then(json => {
        console.log('json >>>', json);
        resolve(json);
      })
      .catch(error => {
        console.log('err', JSON.stringify(error));
        let errorObj = null;
        if (error.response) {
          errorObj = {message: error.response.data.message};
        } else {
          if (error.message.indexOf('timeout ') !== -1) {
            errorObj = {
              message:
                'The request has timed out, Please check your internet connectivity, or try again later',
            };
          } else {
            errorObj = {message: 'Something went wrong please try again later'};
          }
        }
        reject(errorObj);
      });
  });
}

export function postWithLogin(nodeURL, data, dispatch) {
  return new Promise(async (resolve, reject) => {
    axioInstance.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Basic bW9iaWxlOnBpbg==',
    };
    axioInstance
      .post(config.SERVER_URL + nodeURL, data)
      .then(json => {
        console.log('Login Response >>>', json);
        resolve(json);
      })
      .catch(error => {
        console.log('err', JSON.stringify(error));
        let errorObj = null;
        if (error.response) {
          errorObj = {message: error.response.data.message};
        } else {
          if (error.message.indexOf('timeout ') !== -1) {
            errorObj = {
              message:
                'The request has timed out, Please check your internet connectivity, or try again later',
            };
          } else {
            errorObj = {message: 'Something went wrong please try again later'};
          }
        }
        reject(errorObj);
      });
  });
}

export function postWithToken(nodeURL, data, token, dispatch) {
  return new Promise(async (resolve, reject) => {
    axioInstance.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    };
    axioInstance
      .post(config.SERVER_URL + nodeURL, JSON.stringify(data))
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log('err', JSON.stringify(error.response));
        let errorObj = null;
        if (error.response) {
          errorObj = {message: error.response.data.message};
        } else {
          if (error.message.indexOf('timeout ') !== -1) {
            errorObj = {
              message:
                'The request has timed out, Please check your internet connectivity, or try again later',
            };
          } else {
            errorObj = {message: 'Something went wrong please try again later'};
          }
        }
        reject(errorObj);
      });
  });
}

export function getWithToken(nodeURL, token, dispatch) {
  return new Promise(async (resolve, reject) => {
    axioInstance.defaults.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + token,
    };
    axioInstance
      .get(config.SERVER_URL + nodeURL)
      .then(json => {
        resolve(json);
      })
      .catch(error => {
        console.log('err', JSON.stringify(error.response));
        let errorObj = null;
        if (error.response) {
          errorObj = {message: error.response.data.message};
        } else {
          if (error.message.indexOf('timeout ') !== -1) {
            errorObj = {
              message:
                'The request has timed out, Please check your internet connectivity, or try again later',
            };
          } else {
            errorObj = {message: 'Something went wrong please try again later'};
          }
        }
        reject(errorObj);
      });
  });
}

export const post = async (url, body) => {
  try {
    const result = await axioInstance.post(config.SERVER_URL + url, body);
    console.log('Result >>>>>>>', result);
    try {
      return {error: null, response: result};
    } catch (error) {
      return {error: error, response: null};
    }
  } catch (error) {}
};

export const uploadFile = async (url, body, token) => {
  var axioFileInstance = axios.create();
  axioFileInstance.defaults.headers = {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
    Authorization: 'bearer ' + token,
  };

  try {
    const result = await axioFileInstance.post(config.SERVER_URL + url, body);
    console.log('File Upload Result >>>>>>>>', result);
    try {
      return {error: null, response: result};
    } catch (error) {
      return {error: error, response: null};
    }
  } catch (error) {
    console.log('Error>>>>', JSON.stringify(error));
    return {error: error, response: null};
  }
};
