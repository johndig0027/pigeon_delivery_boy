import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from 'react-native';

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from '../assets/db.png';

const Login = props => {
  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'LOGIN'} />
          <InputText
            // style={{width: '100%', height: 60}}
            placeholder={'User Name'}
          />
          <InputText textStyle={{marginTop: 24}} placeholder={'Password'} />

          <Button
            buttonStyle={{marginVertical: 50}}
            text={'LOGIN'}
            onPress={() => {
              props.navigation.push('Drawer');
              console.log('Error');
            }}
          />
        </View>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => props.navigation.push('Register')}>
          <View style={styles.blankView} />
          <Text style={styles.registerText}>JOIN US AS A PARTNER</Text>
          <View style={styles.registerButtonRightCorner}>
            <Image source={db} style={styles.registerImage} />
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Login;
const styles = StyleSheet.create({
  root: {flex: 1},
  middleParent: {
    width: '80%',
    backgroundColor: Colors.appGrey,
    borderRadius: 20,
    marginTop: '10%',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  logoStyle: {
    marginTop: '20%',
    height: 40,
    width: '100%',
    resizeMode: 'contain',
  },
  registerButton: {
    height: 50,
    backgroundColor: '#078424', //#1EC746
    width: '80%',
    alignSelf: 'center',
    marginTop: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  registerButtonRightCorner: {
    height: '100%',
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1EC746',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  registerText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'ProzaLibre-Bold',
  },
  blankView: {
    height: '100%',
    width: 50,
  },
  registerImage: {height: 45, width: 45},
  headerText: {marginVertical: 30, alignSelf: 'center'},
});
