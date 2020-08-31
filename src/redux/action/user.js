export const SET_FIRST_NAME = 'SET_FIRST_NAME';
export const SET_LAST_NAME = 'SET_LAST_NAME';
export const SET_MOBILE_NUMBER = 'SET_MOBILE_NUMBER';
export const SET_EMAIL_ID = 'SET_EMAIL_ID';
export const SET_ADDRESS = 'SET_ADDRESS';
export const SET_ADDRESS_LNE_1 = 'SET_ADDRESS_LNE_1';
export const SET_ADDRESS_LNE_2 = 'SET_ADDRESS_LNE_2';
export const RESET_ALL_REGISTRATION = 'RESET_ALL_REGISTRATION';
export const SET_AADHAR = 'SET_AADHAR';
export const SET_PAN = 'SET_PAN';
export const SET_LICENSE = 'SET_LICENSE';
export const SET_LIGHT_BILL_NUMBER = 'SET_LIGHT_BILL_NUMBER';
export const SET_BIRTH_DATE = 'SET_BIRTH_DATE';
export const SET_USERNAME = 'SET_USERNAME';
export const SET_LANDMARK = 'SET_LANDMARK';
export const REGISTER_USER_RESPONSE = 'REGISTER_USER_RESPONSE';
export const SET_PROFILE_PHOTO = 'SET_PROFILE_PHOTO';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const SET_FROM_LOGIN_SCREEN = 'SET_FROM_LOGIN_SCREEN';

import {storeUserDetails, getUserDetails} from '../../storage';
import {Alert} from 'react-native';
import {postWithoutToken, uploadFile, postWithLogin, getWithToken} from './api';
import {requestStarted, requestCompleted} from './app';

export function setFirstName(text) {
  return {
    type: SET_FIRST_NAME,
    payload: text,
  };
}

export function setLastName(text) {
  return {
    type: SET_LAST_NAME,
    payload: text,
  };
}

export function setMobileNumber(text) {
  return {
    type: SET_MOBILE_NUMBER,
    payload: text,
  };
}

export function setAddress(address) {
  return {
    type: SET_ADDRESS,
    payload: address,
  };
}
export function setAddressLine1(address) {
  return {
    type: SET_ADDRESS_LNE_1,
    payload: address,
  };
}

export function setEmailID(address) {
  return {
    type: SET_EMAIL_ID,
    payload: address,
  };
}

export function setAddressLine2(address) {
  return {
    type: SET_ADDRESS_LNE_2,
    payload: address,
  };
}

export function setAadhar(text) {
  return {
    type: SET_AADHAR,
    payload: text,
  };
}

export function setPan(text) {
  return {
    type: SET_PAN,
    payload: text,
  };
}

export function setLiencese(text) {
  return {
    type: SET_LICENSE,
    payload: text,
  };
}

export function setLightBillNumber(text) {
  return {
    type: SET_LIGHT_BILL_NUMBER,
    payload: text,
  };
}

export function setUsername(text) {
  return {
    type: SET_USERNAME,
    payload: text,
  };
}

export function setBirthDate(text) {
  return {
    type: SET_BIRTH_DATE,
    payload: text,
  };
}

export function setLandmark(text) {
  return {
    type: SET_LANDMARK,
    payload: text,
  };
}

export function setProfilePhotoUri(uri) {
  return {
    type: SET_PROFILE_PHOTO,
    payload: uri,
  };
}
export function resetRegisration() {
  return {
    type: RESET_ALL_REGISTRATION,
  };
}

export function setFromLoginScreen(value) {
  return {
    type: SET_FROM_LOGIN_SCREEN,
    payload: value,
  };
}

export function setLoginResponse(data) {
  return {
    type: LOGIN_RESPONSE,
    payload: data,
  };
}

export const login = (username, password) => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  const request = {
    username,
    password,
  };

  try {
    dispatch(requestStarted());
    const response = await postWithoutToken('user/logindb', request, dispatch);
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      dispatch(setLoginResponse(response.data));
      storeUserDetails(response.data);
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

export const registerUser = request => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  try {
    dispatch(requestStarted());
    const response = await postWithoutToken('user/create', request, dispatch);
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      dispatch({
        type: REGISTER_USER_RESPONSE,
        payload: response.data,
      });
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

export const validateOTP = (username, smsOTP, emailOTP) => async (
  dispatch,
  getState,
) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  const request = {
    smsOTP,
    emailOTP,
    username,
  };

  try {
    dispatch(requestStarted());
    const response = await postWithoutToken(
      'user/validateOtp',
      request,
      dispatch,
    );
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      // dispatch({
      //   type: REGISTER_USER_RESPONSE,
      //   payload: response.data,
      // });

      const userDetails = await getUserDetails();

      if (userDetails) {
        userDetails.user.isMobileNumberVerified = true;
        userDetails.user.isEmailVerified = true;
        await storeUserDetails(userDetails);
      }

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

export const resendOTP = username => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }
  // console.log("Current Device Token :: CreateAccount::: ", deviceToken);

  const request = {
    username,
  };

  try {
    dispatch(requestStarted());
    const response = await postWithoutToken(
      'user/resendDbOtp',
      request,
      dispatch,
    );
    console.log('Response', response);
    dispatch(requestCompleted());
    if (response.status === 200) {
      dispatch({
        type: REGISTER_USER_RESPONSE,
        payload: response.data,
      });
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

export const uploadProfilePhoto = () => async (dispatch, getState) => {
  //   const {isNetwork, deviceToken} = getState().app;
  //   if (!isNetwork) {
  //     Alert.alert('Error', 'Please check your network connectivity');
  //     return;
  //   }

  const {registationResponse, profilePhoto} = getState().user;
  // console.log('sessionToken: ', sessionToken);
  // console.log('user: ', user);
  // console.log('uri: ', uri);

  const formData = new FormData();
  formData.append('file', {
    uri: profilePhoto, //Your Image File Path
    type: 'image/jpeg',
    name: new Date().getTime() + '.jpg',
  });
  formData.append('username', registationResponse.username);
  dispatch(requestStarted());
  const {error, response} = await uploadFile(
    'files/uploadDbPhoto',
    formData,
    null,
  );
  dispatch(requestCompleted());
  console.log('Response', response);
  if (response) {
    return {error: null, response: response.data};
  } else {
    return {error, response: null};
  }
};

export const getKYCDetails = () => async (dispatch, getState) => {
  const {sessionToken} = getState().user;
  console.log('Session Token ::', sessionToken);
  dispatch(requestStarted());
  try {
    const response = await getWithToken(
      'user/getKycStatus',
      sessionToken,
      dispatch,
    );
    dispatch(requestCompleted());
    console.log('KYC STATUS RESPONSE', response);
    if (response.status === 200) {
      const userDetails = await getUserDetails();

      if (userDetails) {
        userDetails.user.isKYCDone = response.data.isKYCdone;
        userDetails.user.isKYCDocSubmitted = response.data.isKycDocSubmitted;
        await storeUserDetails(userDetails);
        dispatch(setLoginResponse(userDetails));
      }
      return {error: null, response: response.data};
    }
  } catch (err) {
    dispatch(requestCompleted());
    return {error: err.message, response: null};
  }
};
