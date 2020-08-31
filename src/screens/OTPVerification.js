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

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import smallCheck from '../assets/smallCheck.png';
import {connect} from 'react-redux';
import {resetRegisration, validateOTP, resendOTP} from '../redux/action';

const OTPVerification = props => {
  console.log('Props >>>>>>> In OTP', props);
  const [mobileCode, setMobileCode] = useState();
  const [emailCode, setEmailCode] = useState();
  const onMobileCodeFilled = async codeText => {
    console.log(codeText);
    // setCodeFilled(true);
  };

  const onEmailCodeFilled = async codeText => {
    console.log(codeText);
    // setCodeFilled(true);
  };

  const onSubmitPress = async () => {
    if (!mobileCode) {
      Alert.alert('Error', 'Please enter mobile OTP');
      return;
    }

    if (mobileCode && mobileCode.trim().length !== 4) {
      Alert.alert('Error', 'Please enter valid mobile OTP');
      return;
    }

    if (!emailCode) {
      Alert.alert('Error', 'Please enter email OTP');
      return;
    }

    if (emailCode && emailCode.trim().length !== 4) {
      Alert.alert('Error', 'Please enter valid email OTP');
      return;
    }

    let username = '';
    if (props.fromLoginToVerification) {
      username = props.userDetails.username;
    } else {
      username = props.registationResponse.username;
    }

    const {error, response} = await props.validateOTP(
      username,
      mobileCode,
      emailCode,
    );

    console.log('Response >>>>>> Verification', response);

    if (!error) {
      if (!props.fromLoginToVerification) {
        props.navigation.push('UnderProcessView');
      } else {
        if (
          !props.userDetails.isKYCDocSubmitted ||
          !props.userDetails.isKYCDone
        ) {
          props.navigation.replace('DBStattusView');
          return;
        } else {
          props.navigation.replace('Drawer');
        }
      }
    }
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon.Button
          type={!props.fromLoginToVerification ? 'back' : ''}
          onPress={() => {
            if (!props.fromLoginToVerification) {
              props.navigation.pop(4);
              props.navigation.pop();
              props.resetRegisration();
            }
          }}
        />
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'OTP PROCESS'} />

          <Text
            style={{
              fontSize: 14,
              fontFamily: 'ProzaLibre-Regular',
              color: 'rgba(0,0,0,0.8)',
              textAlign: 'center',
              marginBottom: 20,
            }}>
            Please click on{' '}
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'ProzaLibre-Medium',
                color: 'rgba(0,0,0,1)',
                textDecorationLine: 'underline',
              }}>
              Resend OTP
            </Text>{' '}
            to get new otp on your registered mobile and email id
          </Text>

          <Text
            style={{
              fontSize: 16,
              fontFamily: 'ProzaLibre-Bold',
              color: '#2e2e2e',
            }}>
            Mobile OTP
          </Text>
          <OTPInputView
            style={styles.otpView}
            pinCount={4}
            code={mobileCode}
            onCodeChanged={codeText => setMobileCode(codeText)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={codeText => onMobileCodeFilled(codeText)}
            placeholderCharacter={'X'}
            placeholderTextColor={'rgba(176,199,197,1)'}
          />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'ProzaLibre-Bold',
              color: '#2e2e2e',
              marginTop: 20,
            }}>
            Email OTP
          </Text>

          <OTPInputView
            style={styles.otpView}
            pinCount={4}
            code={emailCode}
            onCodeChanged={codeText => setEmailCode(codeText)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={codeText => onEmailCodeFilled(codeText)}
            placeholderCharacter={'X'}
            placeholderTextColor={'rgba(176,199,197,1)'}
          />
          <TouchableOpacity style={styles.checkButton}>
            <View style={styles.checkBox}>
              <Image source={smallCheck} />
            </View>
            <Text style={styles.termsText}>
              On click check box you are accepting our
              <Text style={{color: 'red'}}>
                {' '}
                Terms <Text style={styles.termsText}>&</Text> Privacy policy
              </Text>
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginTop: 10,
              alignSelf: 'center',
            }}
            onPress={async () => {
              let username = '';
              if (props.fromLoginToVerification) {
                username = props.userDetails.username;
              } else {
                username = props.registationResponse.username;
              }
              await props.resendOTP(username);
            }}>
            <Text
              style={{
                textDecorationLine: 'underline',
                fontSize: 16,
                fontFamily: 'ProzaLibre-Medium',
              }}>
              Resend OTP
            </Text>
          </TouchableOpacity>

          <Button
            buttonStyle={{marginVertical: 20}}
            text={'SUBMIT'}
            onPress={() => onSubmitPress()}
          />
        </View>
        <Text
          style={{
            color: 'white',
            alignSelf: 'center',
            marginTop: 10,
            fontFamily: 'ProzaLibre-Medium',
          }}>
          {props.registationResponse
            ? 'M : ' +
              props.registationResponse.smsOTP +
              ' E : ' +
              props.registationResponse.mailOTP
            : ''}
        </Text>
      </View>
    </ImageBackground>
  );
};

const mapStateToProps = state => ({
  registationResponse: state.user.registationResponse,
  fromLoginToVerification: state.user.fromLoginToVerification,
  userDetails: state.user.userDetails,
});

export default connect(
  mapStateToProps,
  {resetRegisration, validateOTP, resendOTP},
)(OTPVerification);

// export default OTPVerification;
const styles = StyleSheet.create({
  root: {flex: 1},
  middleParent: {
    width: '80%',
    backgroundColor: Colors.appGrey,
    borderRadius: 20,
    marginTop: '8%',
    paddingHorizontal: 16,
    alignSelf: 'center',
  },
  logoStyle: {
    marginTop: '2%',
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
  headerText: {marginVertical: 10, alignSelf: 'center'},

  borderStyleHighLighted: {
    borderColor: Colors.appGreen,
    fontSize: 25,
  },

  underlineStyleBase: {
    width: 60,
    height: 45,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 18,
    color: Colors.appBlue,
    fontFamily: 'ProzaLibre-Bold',
  },

  underlineStyleHighLighted: {
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 18,
  },
  otpView: {
    width: '95%',
    height: 60,
    alignSelf: 'center',
    fontSize: 18,
    fontFamily: 'ProzaLibre-Medium',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  checkBox: {
    height: 16,
    width: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginTop: 2,
    elevation: 3,
  },
  checkButton: {
    flexDirection: 'row',
    width: '95%',
    alignSelf: 'center',
    marginTop: 24,
  },
  termsText: {
    marginLeft: 16,
    fontFamily: 'ProzaLibre-Medium',
    color: 'rgba(36,26,107,1)',
  },
});
