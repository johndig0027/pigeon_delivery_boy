import {storeCurrentOrderDetails, getUserDetails} from '../../storage';
import {Alert} from 'react-native';
import {getWithToken, postWithToken} from './api';
import {requestStarted, requestCompleted} from './app';
export const LIVE_ORDER_LIST = 'LIVE_ORDER_LIST';
export const COMPLETED_ORDER_LIST = 'COMPLETED_ORDER_LIST';
export const SET_SELECTED_ORDER = 'SET_SELECTED_ORDER';
export const START_LOCATION_TRACKING = 'START_LOCATION_TRACKING';
export const STOP_LOCATION_TRACKING = 'STOP_LOCATION_TRACKING';
export const UPDATE_SELECTED_ORDER_STATUS = 'UPDATE_SELECTED_ORDER_STATUS';
import {cloneDeep} from 'lodash';

export const getLiveOrders = showProgress => async (dispatch, getState) => {
  const {sessionToken} = getState().user;
  if (showProgress) {
    dispatch(requestStarted());
  }
  try {
    const response = await getWithToken(
      'order/getCurrentDBOrder',
      sessionToken,
      dispatch,
    );
    dispatch(requestCompleted());
    console.log('Response', response);
    if (response.status === 200) {
      dispatch({
        type: LIVE_ORDER_LIST,
        payload: response.data,
      });
      return {error: null, response: response.data};
    }
  } catch (err) {
    dispatch(requestCompleted());
    return {error: err.message, response: null};
  }
};

export const getCompletedOrder = showProgress => async (dispatch, getState) => {
  const {sessionToken} = getState().user;
  if (showProgress) {
    dispatch(requestStarted());
  }
  try {
    const response = await getWithToken(
      'order/getDBCompleted',
      sessionToken,
      dispatch,
    );
    dispatch(requestCompleted());
    console.log('Response', response);
    if (response.status === 200) {
      dispatch({
        type: COMPLETED_ORDER_LIST,
        payload: response.data,
      });
      return {error: null, response: response.data};
    }
  } catch (err) {
    dispatch(requestCompleted());
    return {error: err.message, response: null};
  }
};

export const updateOrderStatus = request => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  const {sessionToken} = getState().user;

  try {
    // dispatch(requestStarted());
    const response = await postWithToken(
      'order/updateOrderStatus',
      request,
      sessionToken,
      dispatch,
    );
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      // dispatch({
      //   type: REGISTER_USER_RESPONSE,
      //   payload: response.data,
      // });
      return {error: null, response: response.data};
    } else {
      Alert.alert('Error', response.data.message);
      return {error: response.data.error, response: null};
    }
  } catch (err) {
    dispatch(requestCompleted());
    Alert.alert('Error', err.message);
    return {error: err.message, response: null};
  }
};

export const collectOrder = request => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  const {sessionToken} = getState().user;

  try {
    // dispatch(requestStarted());
    const response = await postWithToken(
      'order/verifyCollectOrder',
      request,
      sessionToken,
      dispatch,
    );
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      // dispatch({
      //   type: REGISTER_USER_RESPONSE,
      //   payload: response.data,
      // });
      return {error: null, response: response.data};
    } else {
      Alert.alert('Error', response.data.message);
      return {error: response.data.error, response: null};
    }
  } catch (err) {
    dispatch(requestCompleted());
    Alert.alert('Error', err.message);
    return {error: err.message, response: null};
  }
};

export function setSelectedOrder(order) {
  return {
    type: SET_SELECTED_ORDER,
    payload: order,
  };
}

export function startLocationTracking() {
  return {
    type: START_LOCATION_TRACKING,
  };
}

export function stopLocationTracking() {
  return {
    type: STOP_LOCATION_TRACKING,
  };
}

export const updateSelectedOrderStatus = status => async (
  dispatch,
  getState,
) => {
  let tempOrder = cloneDeep(getState().order.selectedOrder);
  tempOrder.orderStatus = status;
  // tempOrder = JSON.parse(JSON.stringify(tempOrder).replace(/\:null/gi, ':""'));
  console.log('temp Order >>>', tempOrder);
  await storeCurrentOrderDetails(tempOrder);
  dispatch({
    type: UPDATE_SELECTED_ORDER_STATUS,
    payload: tempOrder,
  });
};
