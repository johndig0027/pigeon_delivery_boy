import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Alert, ImageBackground, Text} from 'react-native';

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from '../assets/db.png';
import {connect} from 'react-redux';
import {
  setAadhar,
  setPan,
  setLiencese,
  setLightBillNumber,
  registerUser,
  uploadProfilePhoto,
} from '../redux/action';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegistrationKYC = props => {
  let adharRef = useRef(null);
  let panRef = useRef(null);
  let licenseRef = useRef(null);
  let lightBillRef = useRef(null);

  const onNextPress = async () => {
    if (!props.aadhar) {
      Alert.alert('Error', 'Please enter first name');
      adharRef.focus();
      return;
    }

    if (!props.pan) {
      Alert.alert('Error', 'Please enter first name');
      panRef.focus();
      return;
    }

    if (!props.license) {
      Alert.alert('Error', 'Please enter first name');
      licenseRef.focus();
      return;
    }

    console.log('Selected Address', props.selectedAdress);

    const request = {
      username: props.username,
      password: 'rahulk',
      email: props.emailId,
      firstName: props.firstName,
      lastName: props.lastName,
      mobile: props.mobile,
      birthDate: props.birthDate,
      roles: [
        {
          role: 'DB',
        },
      ],
      address: [
        {
          addressName: 'DBHOME',
          fullAddress: props.selectedAdress.address,
          houseNo: props.addressLine1,
          apartment: props.addressLine2,
          road: props.landmark,
          city: props.selectedAdress.city,
          district: props.selectedAdress.city,
          state: props.selectedAdress.state,
          country: props.selectedAdress.country,
          latitude: props.selectedAdress.location.lat,
          longitude: props.selectedAdress.location.lng,
          zipCode: props.selectedAdress.pincode,
        },
      ],

      kyc: {
        adharNo: props.aadhar,
        pan: props.pan,
        license: props.license,
        lightBil: props.lighbillNumber,
      },
    };

    console.log('Request object', request);

    const {error, response} = await props.registerUser(request);

    if (!error) {
      const result = await props.uploadProfilePhoto();

      if (!result.error) {
        props.navigation.push('OTPVerification');
      }
    }

    //
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon.Button
          type={'back'}
          onPress={() => {
            props.navigation.pop();
          }}
        />
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'KYC PROCESS'} />
          <KeyboardAwareScrollView>
            <InputText
              // style={{width: '100%', height: 60}}
              onRef={ref => (adharRef = ref)}
              placeholder={'Adhaar Number'}
              onChangeText={text => props.setAadhar(text)}
              returnKeyType={'next'}
              autoCorrect={false}
              autoCompleteType={'off'}
              onSubmitEditing={() => panRef.focus()}
              blurOnSubmit={false}
              maxLength={16}
              value={props.aadhar}
            />
            <InputText
              onRef={ref => (panRef = ref)}
              textStyle={{marginTop: 24}}
              placeholder={'Pan Number'}
              onChangeText={text => props.setPan(text)}
              returnKeyType={'next'}
              autoCorrect={false}
              autoCompleteType={'off'}
              onSubmitEditing={() => licenseRef.focus()}
              blurOnSubmit={false}
              maxLength={9}
              value={props.pan}
            />

            <InputText
              onRef={ref => (licenseRef = ref)}
              textStyle={{marginTop: 24}}
              placeholder={'Licence'}
              onChangeText={text => props.setLiencese(text)}
              returnKeyType={'next'}
              autoCorrect={false}
              autoCompleteType={'off'}
              onSubmitEditing={() => lightBillRef.focus()}
              blurOnSubmit={false}
              maxLength={9}
              value={props.license}
            />

            <InputText
              onRef={ref => (lightBillRef = ref)}
              textStyle={{marginTop: 24, marginBottom: 20}}
              placeholder={'Electric Bill Consumer No (optinal)'}
              onChangeText={text => props.setLightBillNumber(text)}
              returnKeyType={'done'}
              autoCorrect={false}
              autoCompleteType={'off'}
              onSubmitEditing={() => onNextPress}
              blurOnSubmit={false}
              value={props.lighbillNumber}
            />
          </KeyboardAwareScrollView>

          <Button
            buttonStyle={{marginVertical: 10}}
            text={'NEXT'}
            onPress={() => onNextPress()}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// export default RegistrationKYC;

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  firstName: state.user.firstName,
  aadhar: state.user.aadhar,
  pan: state.user.pan,
  license: state.user.license,
  lighbillNumber: state.user.lighbillNumber,
  lastName: state.user.lastName,
  mobile: state.user.mobile,
  addressLine1: state.user.addressLine1,
  addressLine2: state.user.addressLine2,
  emailId: state.user.emailId,
  selectedAdress: state.user.selectedAdress,
  birthDate: state.user.birthDate,
  username: state.user.username,
  landmark: state.user.landmark,
});

export default connect(
  mapStateToProps,
  {
    setAadhar,
    setPan,
    setLiencese,
    setLightBillNumber,
    registerUser,
    uploadProfilePhoto,
  },
)(RegistrationKYC);

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
    marginTop: '5%',
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
