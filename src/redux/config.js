import {Platform} from 'react-native';

const appID = '224117f72a8f9a29a8a5df71911422';
const clientSecret = '480ada81657863225b38c8c37506bca7200154fc';
const HOST =
  Platform.OS === 'android'
    ? 'http://192.168.1.10:8080/'
    : 'http://localhost:8080/';

// http://localhost:8080/
const SERVER_URL = HOST;
const USER_STORE = 'user_store';
const ORDER_STORE = 'order_store';

//  'Content-Type': 'application/json',
//  'x-client-id': '224117f72a8f9a29a8a5df71911422',
//  'x-client-secret': '480ada81657863225b38c8c37506bca7200154fc',

export default {
  appID,
  clientSecret,
  SERVER_URL,
  USER_STORE,
  ORDER_STORE,
};
