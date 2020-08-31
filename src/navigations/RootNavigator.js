import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../screens/Login';
import OTPVerification from '../screens/OTPVerification';
import Register from '../navigations/RegistrationNavigator';
import Drawer from '../navigations/DrawerNavigator';
import DBStattusView from '../screens/DBStattusView';

const Stack = createStackNavigator();
// const store = configureStore();
export default function RootNavigator(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={props.initialRouteName}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Drawer"
          component={Drawer}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="DBStattusView"
          component={DBStattusView}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="OTPVerification"
          component={OTPVerification}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
