import React, {useState, useEffect, useRef} from 'react';

import {Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme';

const Header = props => {
  return <Text style={[styles.textStyle, props.style]}>{props.text}</Text>;
};

export default Header;

const styles = StyleSheet.create({
  textStyle: {
    color: Colors.blueColor,
    fontSize: 26,
    fontWeight: '800',
    fontFamily: 'ProzaLibre-Bold',
  },
});
