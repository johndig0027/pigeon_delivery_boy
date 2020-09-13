import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LiveOrderList from '../screens/LiveOrderList';
import AcceptOrderDetails from '../screens/AcceptOrderDetails';
import AcceptOrderOTP from '../screens/AcceptOrderOTP';
import CurrentOrderPage from '../screens/CurrentOrderPage';
import CancelOrder from '../screens/CancelOrder';
import AssignToNextDB from '../screens/AssignToNextDB';
import FinalOTPScreen from '../screens/FinalOTPScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createStackNavigator();
// const store = configureStore();
export default function OrderNavigator(props) {
  return (
    <Stack.Navigator
      initialRouteName={
        props.route.params && props.route.params.initialRouteName
          ? props.route.params.initialRouteName
          : null
      }>
      <Stack.Screen
        name="LiveOrderList"
        component={LiveOrderList}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AcceptOrderDetails"
        component={AcceptOrderDetails}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AcceptOrderOTP"
        component={AcceptOrderOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CurrentOrderPage"
        component={CurrentOrderPage}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CancelOrder"
        component={CancelOrder}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AssignToNextDB"
        component={AssignToNextDB}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="FinalOTPScreen"
        component={FinalOTPScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
