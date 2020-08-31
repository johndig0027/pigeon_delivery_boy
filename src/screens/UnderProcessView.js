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

import {connect} from 'react-redux';

import backImage from '../assets/bg_screen.png';
import {Colors} from '../theme';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Icon from '../assets/icons';
import Button from '../components/base/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from '../assets/db.png';
import {resetRegisration} from '../redux/action';

const UnderProcessView = props => {
  return (
    <ImageBackground style={{flex: 1}} source={backImage}>
      <View style={styles.root}>
        <Icon.Button
          type={'back'}
          onPress={() => {
            props.navigation.pop(4);
            props.navigation.pop();
            props.resetRegisration();
          }}
        />
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={styles.middleParent}>
          <Header style={styles.headerText} text={'UNDER PROCESS'} />

          <Text style={styles.mainText}>
            Thank you very much for showing interest in pigeonstics. Your
            application is under verification. Please visit our headquater for
            the interview with following documents
          </Text>

          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Aadhar Card</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Pan Card</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Electricity Bill</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Liecens</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Byke Document</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>Resume</Text>
          </View>
          <View style={styles.insParent}>
            <View style={styles.dotStyle} />
            <Text style={styles.insText}>2 Passport size photo</Text>
          </View>

          <Text
            style={[
              styles.mainText,
              {marginTop: 10, color: 'rgba(233,80,72,1)'},
            ]}>
            Please come with original and one xerox copy at 10:30 AM to 6:30 PM
            on following address
          </Text>

          <Text
            style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 10,
              fontFamily: 'ProzaLibre-Medium',
              color: '#A1A1A1',
            }}>
            Governemnt Bunglow no.1 , Samata Nagar, Airport Road, Badami Chowk,
            Near Ishanya Mall, Yerawada | City : PUNE | PIN Code : 411006
          </Text>
          <Button
            buttonStyle={{marginVertical: 10}}
            text={'OK'}
            onPress={() => {
              props.navigation.pop(4);
              props.navigation.pop();
              props.resetRegisration();
            }}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

// export default UnderProcessView;
const mapStateToProps = state => ({});

export default connect(
  mapStateToProps,
  {resetRegisration},
)(UnderProcessView);
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
    marginTop: '1%',
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
  headerText: {marginTop: 10, marginBottom: 10, alignSelf: 'center'},
  termsText: {
    marginLeft: 16,
    fontFamily: 'ProzaLibre-Medium',
    color: 'rgba(36,26,107,1)',
  },
  dotStyle: {
    height: 10,
    width: 10,
    borderRadius: 15,
    backgroundColor: '#1AB53B',
  },
  insText: {
    alignSelf: 'center',
    fontFamily: 'ProzaLibre-Medium',
    textAlign: 'center',
    color: 'rgba(48,53,124,1)',
    marginLeft: 16,
    fontSize: 12,
  },
  insParent: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 30,
  },
  mainText: {
    alignSelf: 'center',
    fontFamily: 'ProzaLibre-Medium',
    textAlign: 'center',
    color: Colors.blueColor,
    // color: 'rgba(234,81,73,1)',
  },
});
