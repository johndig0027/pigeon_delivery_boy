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
import ImagePicker from 'react-native-image-picker';
import {
  setFirstName,
  setLastName,
  setAddressLine1,
  setAddressLine2,
  setMobileNumber,
  setEmailID,
  setUsername,
  setBirthDate,
  setProfilePhotoUri,
} from '../redux/action';

const RegistrationProfile = props => {
  console.log('props>>>>> Reg Profile', props);
  let firstNameRef = useRef(null);
  let lastNameRef = useRef(null);
  let mobRef = useRef(null);
  let emailIdRef = useRef(null);
  let usernameRef = useRef(null);
  let addLine2 = useRef(null);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setBirthDate] = useState(undefined);
  const [profilePhoto, setProfilePhoto] = useState(undefined);

  const showImagePicker = () => {
    const options = {
      title: 'Select Profile Photo',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      noData: true,
    };

    ImagePicker.showImagePicker(options, async response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const fileSize = response.fileSize * 0.000001;
        console.log('File Size in MB :::', fileSize);

        if (fileSize > 2) {
          Alert.alert('Error', 'File size should not be greater than 1 MB');
        } else {
          console.log('JUST Response >>>>>', response);
          console.log('Response >>>>>', response.uri);
          // const source = {uri: response.uri};
          props.setProfilePhotoUri(response.uri);
          // setProfilePhoto(source);
          // const uploadResult = await props.uploadProfilePhoto(response.uri);
          // if (uploadResult.error) {
          // } else {
          // }

          // console.log('Response In Picker ', uploadResult);
        }
        // this.setState({
        //   avatarSource: source,
        // });
      }
    });
  };

  const onNextClick = () => {
    var patt = /^[0-9]{10}/;

    if (!props.profilePhoto) {
      Alert.alert('Error', 'Please select profile photo');
      return;
    }

    if (!props.firstName) {
      Alert.alert('Error', 'Please enter first name');
      firstNameRef.focus();
      return;
    }

    if (!props.lastName) {
      Alert.alert('Error', 'Please enter last name');
      lastNameRef.focus();
      return;
    }

    if (!props.username) {
      Alert.alert('Error', 'Please enter username');
      usernameRef.focus();
      return;
    }

    if (!props.mobile) {
      Alert.alert('Error', 'Please enter mobile number');
      mobRef.focus();
      return;
    }

    if (!patt.test(props.mobile)) {
      Alert.alert('Error', 'Please enter valid mobile number');
      mobRef.focus();
      return;
    }

    if (!props.emailId) {
      Alert.alert('Error', 'Please enter email id');
      emailIdRef.focus();
      return;
    }

    if (!validateEmail(props.emailId)) {
      Alert.alert('Error', 'Please enter valid email id');
      emailIdRef.focus();
      return;
    }

    if (!props.birthDate) {
      Alert.alert('Error', 'Please select birthdate');
      return;
    }

    props.navigation.push('RegistrationAddress');
  };

  const validateEmail = email => {
    // var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^[^<>()[\]\\,;:\%#^\s@\"$&!@]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleConfirm = date => {
    console.log('Selected Date :: ', date);

    const formattedDate = moment(date).format('DD-MMM-YYYY');
    const birthDateinMillisecond = moment(date).valueOf();
    setBirthDate(formattedDate);
    setDatePicker(false);
    props.setBirthDate(birthDateinMillisecond);
  };

  const handleCancel = () => {
    setDatePicker(false);
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon.Button type={'back'} onPress={() => props.navigation.pop()} />
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'REGISTRATION'} />

          <KeyboardAwareScrollView>
            <View style={{paddingBottom: 16}}>
              <TouchableOpacity
                style={styles.imageButton}
                onPress={() => showImagePicker()}>
                {props.profilePhoto ? (
                  <Image
                    source={{uri: props.profilePhoto}}
                    style={{height: 70, width: 70, borderRadius: 35}}
                  />
                ) : (
                  <Icon
                    type={'profile'}
                    style={{height: 40, width: 40, resizeMode: 'contain'}}
                  />
                )}
              </TouchableOpacity>

              <InputText
                textStyle={{marginTop: 26, marginLeft: 16, paddingLeft: 60}}
                onChangeText={text => props.setFirstName(text)}
                placeholder={'First Name'}
                returnKeyType={'next'}
                onSubmitEditing={() => lastNameRef.focus()}
                value={props.firstName}
                blurOnSubmit={false}
                autoCorrect={false}
                autoCompleteType={'off'}
                onRef={ref => {
                  firstNameRef = ref;
                }}
              />

              <InputText
                onChangeText={text => props.setLastName(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Last Name'}
                returnKeyType={'next'}
                onRef={ref => {
                  lastNameRef = ref;
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => usernameRef.focus()}
                value={props.lastName}
                autoCorrect={false}
                autoCompleteType={'off'}
              />

              <InputText
                onChangeText={text => props.setUsername(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Username'}
                returnKeyType={'next'}
                onRef={ref => {
                  usernameRef = ref;
                }}
                blurOnSubmit={false}
                onSubmitEditing={() => mobRef.focus()}
                value={props.username}
                autoCorrect={false}
                autoCompleteType={'off'}
              />

              <InputText
                onChangeText={text => props.setMobileNumber(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Mobile Number'}
                returnKeyType={'next'}
                onRef={ref => (mobRef = ref)}
                onSubmitEditing={() => emailIdRef.focus()}
                value={props.mobile}
                blurOnSubmit={false}
                keyboardType={'phone-pad'}
                autoCorrect={false}
                autoCompleteType={'off'}
                maxLength={10}
              />

              <InputText
                onChangeText={text => props.setEmailID(text)}
                textStyle={{marginTop: 24}}
                placeholder={'E-mail ID (Optional)'}
                returnKeyType={'next'}
                onRef={ref => (emailIdRef = ref)}
                value={props.emailId}
                blurOnSubmit={false}
                keyboardType={'email-address'}
                onSubmitEditing={() => onNextClick()}
                autoCorrect={false}
                autoCompleteType={'off'}
                autoCapitalize="none"
              />

              <View style={styles.searchLocationButton}>
                <TouchableOpacity
                  style={styles.searchText}
                  onPress={() => {
                    setDatePicker(true);
                    // props.navigation.push('SearchLocation')
                  }}>
                  <Text
                    style={{
                      color: date ? 'black' : Colors.dullBlue,
                    }}>
                    {date ? date : 'Select BirthDate'}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity>
              <InputText
                textStyle={{marginTop: 24}}
                placeholder={'Mobile Number'}
                editable={false}
              />
            </TouchableOpacity> */}
              {/* <InputText
                onChangeText={text => props.setAddressLine1(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Address Line1,Flat,Wing Building'}
                returnKeyType={'next'}
                onRef={ref => (addLine1 = ref)}
                onSubmitEditing={() => addLine2.focus()}
                blurOnSubmit={false}
                value={props.addressLine1}
                autoCorrect={false}
                autoCompleteType={'off'}
              />

              <InputText
                onChangeText={text => props.setAddressLine2(text)}
                textStyle={{marginTop: 24}}
                placeholder={'Address Line2,Road, Lane, Nagar'}
                returnKeyType={'next'}
                onRef={ref => (addLine2 = ref)}
                onSubmitEditing={() => emailIdRef.focus()}
                blurOnSubmit={false}
                value={props.addressLine2}
                autoCorrect={false}
                autoCompleteType={'off'}
              /> */}
            </View>
          </KeyboardAwareScrollView>
          <Button
            buttonStyle={{marginVertical: 20}}
            text={'NEXT'}
            onPress={() => onNextClick()}
          />
        </View>
        <DateTimePickerModal
          isVisible={datePicker}
          mode="date"
          onConfirm={date => handleConfirm(date)}
          onCancel={() => handleCancel()}
        />
      </View>
    </ImageBackground>
  );
};

// export default RegistrationProfile;

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
  firstName: state.user.firstName,
  lastName: state.user.lastName,
  mobile: state.user.mobile,
  addressLine1: state.user.addressLine1,
  addressLine2: state.user.addressLine2,
  emailId: state.user.emailId,
  selectedAdress: state.user.selectedAdress,
  birthDate: state.user.birthDate,
  username: state.user.username,
  profilePhoto: state.user.profilePhoto,
});

export default connect(
  mapStateToProps,
  {
    setFirstName,
    setLastName,
    setAddressLine1,
    setAddressLine2,
    setMobileNumber,
    setEmailID,
    setUsername,
    setBirthDate,
    setProfilePhotoUri,
  },
)(RegistrationProfile);

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
    marginTop: '2%',
    height: 40,
    width: '100%',
    resizeMode: 'contain',
  },
  imageButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    marginBottom: 10,
    position: 'absolute',
    zIndex: 100,
    borderColor: Colors.dullBlue,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
