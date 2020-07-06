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
} from 'react-native';

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import smallCheck from '../assets/smallCheck.png';

const OTPVerification = props => {
  const [code, setCode] = useState();
  const onCodeFilled = async codeText => {
    console.log(codeText);
    // setCodeFilled(true);
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'OTP PROCESS'} />

          <OTPInputView
            style={styles.otpView}
            pinCount={4}
            code={code}
            onCodeChanged={codeText => setCode(codeText)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={codeText => onCodeFilled(codeText)}
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

          <Button
            buttonStyle={{marginVertical: 50}}
            text={'SUBMIT'}
            onPress={() => {
              props.navigation.push('UnderProcessView');

              //   props.navigation.pop(4);
              //   props.navigation.pop();
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default OTPVerification;
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
