/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Provider} from 'react-redux';
import DeliveryBoyContainer from './src/screens/DeliveryBoyContainer';
import configureStore from './src/redux/store';
const store = configureStore();
console.disableYellowBox = true;

const App = () => {
  return (
    <Provider store={store}>
      <DeliveryBoyContainer />
    </Provider>
  );
};

export default App;
