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
    const jsonObject = JSON.parse(value);
    if (value !== null) {
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
    // console.log("data", data);
    return [data];
  } catch (e) {
    // saving error
  }
};
