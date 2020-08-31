import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import RegistrationProfile from '../screens/RegistrationProfile';
import RegistrationKYC from '../screens/RegistrationKYC';
import OTPVerification from '../screens/OTPVerification';
import UnderProcessView from '../screens/UnderProcessView';
import SearchLocation from '../screens/SearchLocation';
import RegistrationAddress from '../screens/RegistrationAddress';
import {Colors} from '../theme';
const Stack = createStackNavigator();
// const store = configureStore();
export default function Order(props) {
  console.log('Props >>>>111', props);
  return (
    <Stack.Navigator
      initialRouteName={
        props.route.params && props.route.params.initialRouteName
          ? props.route.params.initialRouteName
          : null
      }>
      <Stack.Screen
        name="RegistrationProfile"
        component={RegistrationProfile}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="RegistrationKYC"
        component={RegistrationKYC}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="OTPVerification"
        component={OTPVerification}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="UnderProcessView"
        component={UnderProcessView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SearchLocation"
        component={SearchLocation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RegistrationAddress"
        component={RegistrationAddress}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
