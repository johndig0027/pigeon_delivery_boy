import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, ImageBackground, Text} from 'react-native';
import backImage from '../assets/bg_screen.png';
import {connect} from 'react-redux';
import {} from '../redux/action';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import RNExitApp from 'react-native-exit-app';

import {getKYCDetails} from '../redux/action';

const DBStatusView = props => {
  const getMessage = () => {
    if (!props.userDetails.isKYCDocSubmitted) {
      return 'You have not submitted your kyc documents, Please submit your kyc documents as soon as possible on the following address, so you can start your delivery service with pigenostic family.';
    }

    return 'Your application is under review, we will send you email or sms once your application is approved. Sorry for the delay';
  };

  const getHeader = () => {
    return 'Under Review';
  };

  useEffect(() => {
    getKyc();
  }, []);

  const getKyc = async () => {
    const {error, response} = await props.getKYCDetails();

    if (!error) {
      if (response.isKYCdone && response.isKycDocSubmitted) {
        props.navigation.reset('Drawer');
      }
    }
  };

  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={getHeader()} />
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'ProzaLibre-Regular',
              textAlign: 'center',
            }}>
            {getMessage()}
          </Text>

          {!props.userDetails.isKYCDocSubmitted ? (
            <>
              <Text
                style={[
                  styles.mainText,
                  {marginTop: 10, color: 'rgba(233,80,72,1)'},
                ]}>
                Please come with original and one xerox copy at 10:30 AM to 6:30
                PM on following address
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'ProzaLibre-Regular',
                  textAlign: 'center',
                  color: 'rgba(0,0,0,0.5)',
                  marginTop: 30,
                }}>
                Governemnt Bunglow no.1 , Samata Nagar, Airport Road, Badami
                Chowk, Near Ishanya Mall, Yerawada | City : PUNE | PIN Code :
                411006
              </Text>
            </>
          ) : null}

          <Button
            buttonStyle={{marginVertical: 50}}
            text={'OK'}
            onPress={() => RNExitApp.exitApp()}
          />
        </View>
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
  {getKYCDetails},
)(DBStatusView);

// export default DBStatusView;
const styles = StyleSheet.create({
  root: {flex: 1},
  middleParent: {
    width: '80%',
    backgroundColor: Colors.appGrey,
    borderRadius: 20,
    marginTop: '10%',
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
  headerText: {marginVertical: 30, alignSelf: 'center'},
  mainText: {
    alignSelf: 'center',
    fontFamily: 'ProzaLibre-Medium',
    textAlign: 'center',
    color: Colors.blueColor,
    // color: 'rgba(234,81,73,1)',
  },
});
