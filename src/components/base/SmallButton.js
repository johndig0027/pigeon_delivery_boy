import React, {useState, useEffect, useRef} from 'react';

import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {Colors} from '../../theme';

const SmallButton = props => {
  return (
    <TouchableOpacity
      style={[styles.buttonStyle, props.buttonStyle]}
      onPress={() => props.onPress()}>
      <Text style={[styles.buttonText, props.buttonTextStyle]}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

export default SmallButton;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.blueColor,
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'ProzaLibre-Bold',
  },
  buttonStyle: {
    height: 32,
    backgroundColor: Colors.buttonBlue,
    fontFamily: 'ProzaLibre-Regular',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
    fontFamily: 'ProzaLibre-Medium',
  },
  textInputStyle: {
    height: 60,
    fontFamily: 'ProzaLibre-Regular',
    backgroundColor: 'red',
    borderRadius: 22.5,
    borderColor: Colors.borderGrey,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    textAlign: 'center',
    elevation: 4,
    fontSize: 18,
    color: 'black',
  },
});
