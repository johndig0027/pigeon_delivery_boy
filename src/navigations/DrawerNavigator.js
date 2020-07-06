import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LiveOrderList from '../screens/LiveOrderList';
import OrderNavigator from './OrderNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = props => (
  <Drawer.Navigator initialRouteName="Home">
    <Drawer.Screen
      name="Home"
      component={OrderNavigator}
      options={{
        header: null,
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
