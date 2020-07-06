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

const RegistrationProfile = props => {
  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'REGISTRATION'} />
          <InputText
            // style={{width: '100%', height: 60}}
            placeholder={'Your Full Name'}
          />
          <InputText
            textStyle={{marginTop: 24}}
            placeholder={'Mobile Number'}
          />

          <InputText
            textStyle={{marginTop: 24}}
            placeholder={'Address Line1,Flat,Wing Building'}
          />

          <InputText
            textStyle={{marginTop: 24}}
            placeholder={'Address Line2,Road, Lane, Nagar'}
          />

          <InputText
            textStyle={{marginTop: 24}}
            placeholder={'E-mail ID (Optional)'}
          />

          <Button
            buttonStyle={{marginVertical: 50}}
            text={'NEXT'}
            onPress={() => props.navigation.push('RegistrationKYC')}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default RegistrationProfile;
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
  headerText: {marginVertical: 30, alignSelf: 'center'},
});
