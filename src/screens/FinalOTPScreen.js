import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Linking,
  Platform,
  TouchableOpacity,
} from 'react-native';
import Icon from '../assets/icons';
import {Colors} from '../theme';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import SmallButton from '../components/base/SmallButton';
const FinalOTPScreen = props => {
  const [code, setCode] = useState();
  const onCodeFilled = async codeText => {
    console.log(codeText);
    // setCodeFilled(true);
  };

  return (
    <View style={{flex: 1}}>
      <View style={styles.navBarStyle}>
        <TouchableOpacity
          style={{width: 60, alignItems: 'center'}}
          onPress={() => props.navigation.pop()}>
          <Icon type={'back'} />
        </TouchableOpacity>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={{width: 60}} />
      </View>

      <View style={{justifyContent: 'space-between', flex: 1}}>
        <View
          style={{flex: 1, backgroundColor: 'white', justifyContent: 'center'}}>
          <View style={styles.dummyView} />
          <Text style={styles.submitOtpText}>Submit OTP</Text>
          <OTPInputView
            style={styles.otpView}
            pinCount={6}
            code={code}
            onCodeChanged={codeText => setCode(codeText)}
            autoFocusOnLoad
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={codeText => onCodeFilled(codeText)}
            placeholderCharacter={'X'}
            placeholderTextColor={'rgba(176,199,197,1)'}
          />
        </View>

        <View style={{height: 100}}>
          <View style={styles.listDivider} />
          <SmallButton
            text={'Submit'}
            buttonStyle={{width: '50%', alignSelf: 'center', marginTop: 30}}
          />
        </View>
      </View>
    </View>
  );
};

export default FinalOTPScreen;

const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'white'},
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: 'white',
    marginVertical: 8,
    borderRadius: 5,
    height: 250,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    flexDirection: 'row',
  },
  title: {
    fontSize: 32,
  },
  indexParent: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(238,238,238,1)',
    borderTopLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexText: {
    fontSize: 18,
    fontFamily: 'ProzaLibre-Medium',
  },
  navBarStyle: {
    height: 60,
    backgroundColor: Colors.headerBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subParent: {flex: 1},
  listSubItem: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  labelText: {
    fontSize: 10,
    fontFamily: 'ProzaLibre-Regular',
    color: 'rgba(134,148,155,1)',
  },
  valueText: {
    fontSize: 13,
    marginTop: 2,
    fontFamily: 'ProzaLibre-Regular',
  },
  acceptButtonParent: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
  },
  declineButton: {flex: 1, backgroundColor: Colors.buttonBlue},
  acceptButton: {
    backgroundColor: Colors.appRed,
    width: 200,
    alignSelf: 'center',
  },
  logoStyle: {
    height: 60,
    resizeMode: 'contain',
    width: '40%',
  },
  listDivider: {
    height: 0.5,
    backgroundColor: 'rgba(207,212,215,1)',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },
  bottomButtonParent: {
    height: 40,
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginTop: 40,
  },
  registerButton: {
    height: 50,
    backgroundColor: '#078424', //#1EC746
    width: '80%',
    alignSelf: 'center',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
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
  registerImage: {height: 30, width: 30},
  mapParent: {
    height: '40%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  directionButtonparent: {
    position: 'absolute',
    height: 50,
    width: '100%',
    bottom: 10,
  },
  underlineStyleBase: {
    width: 40,
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
    width: '70%',
    height: 50,
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
  dummyView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: Colors.blueColor,
    opacity: 0.5,
  },
  submitOtpText: {
    alignSelf: 'center',
    color: 'white',
    fontFamily: 'ProzaLibre-Medium',
    marginBottom: 20,
  },
});
