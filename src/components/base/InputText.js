import React, {useState, useEffect, useRef} from 'react';

import {StyleSheet, TextInput} from 'react-native';
import {Colors} from '../../theme';

const InputText = props => {
  return (
    <TextInput
      style={[styles.text, props.textStyle]}
      placeholderTextColor={Colors.dullBlue}
      {...props}
    />
  );
};

export default InputText;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.blueColor,
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'ProzaLibre-Bold',
  },
  text: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 18,
    fontFamily: 'ProzaLibre-Regular',
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 14,
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
