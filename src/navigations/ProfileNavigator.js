import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import ProfileScreen from '../screens/ProfileScreen';
import ChangePassword from '../screens/ChangePassword';

const Stack = createStackNavigator();
// const store = configureStore();
export default function ProfileNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName={
        props.route.params && props.route.params.initialRouteName
          ? props.route.params.initialRouteName
          : null
      }>
      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
