import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LiveOrderList from '../screens/LiveOrderList';
import CompletedOrders from '../screens/CompletedOrders';
import OrderNavigator from './OrderNavigator';
import DrawerView from '../screens/DrawerView';
import Profile from './ProfileNavigator';
const Drawer = createDrawerNavigator();

const DrawerNavigator = props => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={data => <DrawerView {...data} />}>
    <Drawer.Screen
      name="Home"
      component={OrderNavigator}
      options={{
        header: null,
      }}
    />
    <Drawer.Screen
      name="CompletedOrders"
      component={CompletedOrders}
      options={{
        header: null,
      }}
    />
    <Drawer.Screen
      name="Profile"
      component={Profile}
      options={{
        header: null,
      }}
    />
  </Drawer.Navigator>
);

export default DrawerNavigator;
