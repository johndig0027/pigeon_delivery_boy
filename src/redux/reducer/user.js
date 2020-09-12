import * as actionTypes from '../action';
import {cloneDeep, findIndex} from 'lodash';

const initialState = {
  addressList: [],
  firstName: 'r',
  lastName: 'm',
  mobile: '9920826261',
  addressLine1: 'a',
  addressLine2: 'b',
  emailId: 'nakate.rahul@gmail.com',
  selectedAdress: undefined,
  aadhar: '1212121212',
  pan: '123123123123',
  license: '123123123',
  lighbillNumber: undefined,
  birthDate: undefined,
  username: 'r',
  landmark: 'r',
  registationResponse: undefined,
  profilePhoto: undefined,
  sessionToken: undefined,
  refreshToken: undefined,
  userDetails: undefined,

  fromLoginToVerification: false,
  deviceToken: null,

  // firstName: undefined,
  // lastName: undefined,
  // mobile: undefined,
  // addressLine1: undefined,
  // addressLine2: undefined,
  // emailId: undefined,
  // selectedAdress: undefined,
  // aadhar: undefined,
  // pan: undefined,
  // license: undefined,
  // lighbillNumber: undefined,
  //  birthDate: undefined,
  // username: undefined,
  //landmark: undefined,
};

const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_FIRST_NAME: {
      return {
        ...state,
        firstName: action.payload,
      };
    }
    case actionTypes.SET_LAST_NAME: {
      return {
        ...state,
        lastName: action.payload,
      };
    }
    case actionTypes.SET_MOBILE_NUMBER: {
      return {
        ...state,
        mobile: action.payload,
      };
    }
    case actionTypes.SET_ADDRESS_LNE_1: {
      return {
        ...state,
        addressLine1: action.payload,
      };
    }
    case actionTypes.SET_ADDRESS_LNE_2: {
      return {
        ...state,
        addressLine2: action.payload,
      };
    }
    case actionTypes.SET_EMAIL_ID: {
      return {
        ...state,
        emailId: action.payload,
      };
    }
    case actionTypes.SET_ADDRESS: {
      return {
        ...state,
        selectedAdress: action.payload,
      };
    }

    case actionTypes.SET_AADHAR: {
      return {
        ...state,
        aadhar: action.payload,
      };
    }
    case actionTypes.SET_BIRTH_DATE: {
      return {
        ...state,
        birthDate: action.payload,
      };
    }
    case actionTypes.SET_USERNAME: {
      return {
        ...state,
        username: action.payload,
      };
    }
    case actionTypes.SET_PAN: {
      return {
        ...state,
        pan: action.payload,
      };
    }
    case actionTypes.SET_LICENSE: {
      return {
        ...state,
        license: action.payload,
      };
    }
    case actionTypes.SET_LIGHT_BILL_NUMBER: {
      return {
        ...state,
        lighbillNumber: action.payload,
      };
    }
    case actionTypes.SET_LANDMARK: {
      return {
        ...state,
        landmark: action.payload,
      };
    }
    case actionTypes.REGISTER_USER_RESPONSE: {
      return {
        ...state,
        registationResponse: action.payload,
      };
    }
    case actionTypes.SET_PROFILE_PHOTO: {
      return {
        ...state,
        profilePhoto: action.payload,
      };
    }
    case actionTypes.SET_FROM_LOGIN_SCREEN: {
      return {
        ...state,
        fromLoginToVerification: action.payload,
      };
    }
    case actionTypes.SET_DEVICE_TOKEN: {
      return {
        ...state,
        deviceToken: action.payload,
      };
    }
    case actionTypes.LOGIN_RESPONSE: {
      return {
        ...state,
        sessionToken: action.payload.access_token,
        refreshToken: action.payload.refresh_token,
        userDetails: action.payload.user,
      };
    }
    case actionTypes.RESET_ALL_REGISTRATION: {
      return {
        ...state,
        addressList: [],
        firstName: undefined,
        lastName: undefined,
        mobile: undefined,
        addressLine1: undefined,
        addressLine2: undefined,
        emailId: undefined,
        selectedAdress: undefined,
        aadhar: undefined,
        pan: undefined,
        license: undefined,
        lighbillNumber: undefined,
        birthDate: undefined,
        username: undefined,
        landmark: undefined,
        registationResponse: undefined,
        profilePhoto: undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export default userReducers;
