import AsyncStorage from '@react-native-community/async-storage';

import config from '../redux/config';

export const storeUserDetails = async data => {
  try {
    await AsyncStorage.setItem(config.USER_STORE, JSON.stringify(data));
  } catch (e) {
    // saving error
  }
};

export const getUserDetails = async () => {
  try {
    const value = await AsyncStorage.getItem(config.USER_STORE);

    if (value !== null) {
      const jsonObject = JSON.parse(value);
      // console.log("Logged In", jsonObject);
      return jsonObject;
    } else {
      // console.log("Not Logged In", jsonObject);
      return undefined;
    }
  } catch (e) {
    // error reading value
    // console.log("Error In Storage: Not Logged In", e);
    return undefined;
  }
};

export const logOutUser = async () => {
  try {
    const data = await AsyncStorage.removeItem(config.USER_STORE);
    removeOrder();
    // console.log("data", data);
    return [data];
  } catch (e) {
    // saving error
  }
};

export const storeCurrentOrderDetails = async order => {
  try {
    await AsyncStorage.setItem(config.ORDER_STORE, JSON.stringify(order));
  } catch (e) {
    // saving error
  }
};

export const getOrderDetails = async () => {
  try {
    const value = await AsyncStorage.getItem(config.ORDER_STORE);

    console.log('Value >>>>>', value);

    if (value !== null) {
      const jsonObject = JSON.parse(value);
      // console.log("Logged In", jsonObject);
      return jsonObject;
    } else {
      // console.log("Not Logged In", jsonObject);
      return undefined;
    }
  } catch (e) {
    // error reading value
    // console.log("Error In Storage: Not Logged In", e);
    return undefined;
  }
};

export const removeOrder = async () => {
  try {
    const data = await AsyncStorage.removeItem(config.ORDER_STORE);
    // console.log("data", data);
    return [data];
  } catch (e) {
    // saving error
  }
};
