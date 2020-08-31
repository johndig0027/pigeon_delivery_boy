import axios from 'axios';
import {filter} from 'lodash';
var axioInstance = axios.create();
// Override timeout default for the library
// Now all requests will wait 2.5 seconds before timing out
axioInstance.defaults.timeout = 30000;
axioInstance.defaults.headers = {
  Accept: 'application/xml',
  'Content-Type': 'application/xml',
};

export const searchAPI = async (text, sessionToken = '1234567891') => {
  const url =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' +
    text +
    '&key=AIzaSyBsCtcqdTYjLd1cROn9r-Kvz09eE7WqMs8&sessiontoken=' +
    sessionToken +
    '&components=country:IN';

  console.log('url', url);
  const data = await axioInstance.get(url);
  // console.log('dataLLLLL', data);
  return data.data.predictions;
};

export const getLatLongFromPlaceId = async placeId => {
  const url =
    'https://maps.googleapis.com/maps/api/place/details/json?placeid=' +
    placeId +
    '&key=AIzaSyBsCtcqdTYjLd1cROn9r-Kvz09eE7WqMs8';
  console.log('url', url);
  const result = await axioInstance.get(url);
  // console.log('data in URl ::::', result);
  const addressComponent = result.data.result.address_components;
  console.log('Addd', addressComponent);
  const {state, city, pincode, country} = getCityState(addressComponent);
  return {
    location: result.data.result.geometry.location,
    pincode,
    state,
    city,
    country,
  };
};

const getCityState = addressComponent => {
  const stateObject = filter(addressComponent, {
    types: ['administrative_area_level_1'],
  });

  let state = undefined;

  if (stateObject && stateObject.length > 0) {
    state = stateObject[0].long_name;
  }

  let city = undefined;
  const cityObject = filter(addressComponent, {
    types: ['administrative_area_level_2'],
  });
  if (cityObject && cityObject.length > 0) {
    city = cityObject[0].long_name;
  }

  let pincode = undefined;
  const pincodeObject = filter(addressComponent, {
    types: ['postal_code'],
  });

  if (pincodeObject && pincodeObject.length > 0) {
    pincode = pincodeObject[0].long_name;
  }

  let country = undefined;

  const countryObject = filter(addressComponent, {
    types: ['country'],
  });

  if (countryObject && countryObject.length > 0) {
    country = countryObject[0].long_name;
  }

  return {state, city, pincode, country};
};

// From the place_id you got, query Place Details something like https://maps.googleapis.com/maps/api/place/details/json?placeid={placeid}&key=

// get address from latitude and longitude
export const getAddressFromLatLong = async (lat, long) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=AIzaSyBsCtcqdTYjLd1cROn9r-Kvz09eE7WqMs8`;
  const result = await axioInstance.get(url);
  // console.log('Result :::::', JSON.stringify(result));
  if (
    result.status === 200 &&
    result.data.results &&
    result.data.results.length > 0
  ) {
    const addressComponent = result.data.results[0].address_components;
    const {state, city, pincode, country} = getCityState(addressComponent);

    // console.log('Pincode', pincode);
    const addressObject = {
      address: result.data.results[0].formatted_address,
      latitude: result.data.results[0].geometry.location.lat,
      longitude: result.data.results[0].geometry.location.lng,
      pincode,
      state,
      city,
      country,
    };
    return {response: addressObject, error: null};
  } else {
    return {response: null, error: 'not a valid lat long'};
  }
};
