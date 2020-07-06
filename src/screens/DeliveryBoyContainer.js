import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import RootNavigator from '../navigations/RootNavigator';
import {SafeAreaView} from 'react-navigation';
//
const DeliveryBoyContainer = props => {
  return (
    // <View style={{flex: 1}}>
    //   <RootNavigator />
    // </View>

    <SafeAreaView style={{flex: 1}}>
      <RootNavigator />
    </SafeAreaView>
  );
};

export default DeliveryBoyContainer;
