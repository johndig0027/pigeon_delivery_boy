import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from '../../assets/icons';
import {Colors} from '../../theme';

const DrawerHeader = props => {
  return (
    <View style={styles.navBarStyle}>
      <TouchableOpacity
        style={{width: 60, alignItems: 'center'}}
        onPress={() => props.navigation.toggleDrawer()}>
        <Icon type={'menu'} />
      </TouchableOpacity>
      <Icon type={'logo'} style={styles.logoStyle} />
      <View style={{width: 60}} />
    </View>
  );
};

export default DrawerHeader;
const styles = StyleSheet.create({
  navBarStyle: {
    height: 60,
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoStyle: {
    height: 60,
    resizeMode: 'contain',
    width: '40%',
  },
});
