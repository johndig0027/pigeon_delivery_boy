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
  TouchableOpacity,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import db from '../assets/db.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {setAddressLine1, setAddressLine2, setLandmark} from '../redux/action';

const RegistrationAddress = props => {
  console.log('props>>>>> Reg Profile', props);
  let landmark = useRef(null);
  let addLine1 = useRef(null);
  let addLine2 = useRef(null);

  const onNextClick = () => {
    var patt = /^[0-9]{10}/;

    if (!props.selectedAdress) {
      Alert.alert('Error', 'Please select address');
      return;
    }

    if (!props.addressLine1) {
      Alert.alert('Error', 'Please enter specific address');
      addLine1.focus();
      return;
    }

    props.navigation.push('RegistrationKYC');
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon.Button type={'back'} onPress={() => props.navigation.pop()} />
        <Icon type={'logo'} style={styles.logoStyle} />

        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'ADDRESS'} />

          <KeyboardAwareScrollView>
            <View style={{paddingBottom: 16}}>
              <View style={styles.searchLocationButton}>
                <TouchableOpacity
                  style={styles.searchText}
                  onPress={() => {
                    props.navigation.push('SearchLocation');
                  }}>
                  <Text
                    style={{
                      color: props.selectedAdress ? 'black' : Colors.dullBlue,
                    }}>
                    {props.selectedAdress
                      ? props.selectedAdress.address
                      : 'Select your address'}
                  </Text>
                </TouchableOpacity>
              </View>

              <InputText
                textStyle={{marginTop: 24}}
                onChangeText={text => props.setAddressLine1(text)}
                placeholder={'Apartment, Building Name, Sector, lane'}
                returnKeyType={'next'}
                onSubmitEditing={() => addLine2.focus()}
                value={props.addressLine1}
                blurOnSubmit={false}
                autoCorrect={false}
                autoCompleteType={'off'}
                onRef={ref => {
                  addLine1 = ref;
                }}
              />

              <InputText
                onChangeText={text => props.setAddressLine2(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Falt, Hose no  etc '}
                returnKeyType={'next'}
                onRef={ref => {
                  addLine2 = ref;
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => landmark.focus()}
                value={props.addressLine2}
                autoCorrect={false}
                autoCompleteType={'off'}
              />

              <InputText
                onChangeText={text => props.setLandmark(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Landmark (optinal)'}
                returnKeyType={'next'}
                onRef={ref => {
                  landmark = ref;
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => onNextClick()}
                value={props.landmark}
                autoCorrect={false}
                autoCompleteType={'off'}
              />
            </View>
          </KeyboardAwareScrollView>
          <Button
            buttonStyle={{marginVertical: 20}}
            text={'NEXT'}
            onPress={() => onNextClick()}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// export default RegistrationProfile;

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  addressLine1: state.user.addressLine1,
  addressLine2: state.user.addressLine2,
  selectedAdress: state.user.selectedAdress,
  landmark: state.user.landmark,
});

export default connect(
  mapStateToProps,
  {
    setAddressLine1,
    setAddressLine2,
    setLandmark,
  },
)(RegistrationAddress);

const styles = StyleSheet.create({
  root: {flex: 1},
  middleParent: {
    width: '80%',
    backgroundColor: Colors.appGrey,
    borderRadius: 20,
    marginTop: '5%',
    paddingHorizontal: 16,
    alignSelf: 'center',
    maxHeight: '80%',
  },
  logoStyle: {
    marginTop: '10%',
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
  searchLocationButton: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 24,
  },
  searchText: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    paddingHorizontal: 16,
    fontFamily: 'ProzaLibre-Regular',
  },
});
