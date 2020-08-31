import React, {useState, useEffect, useRef} from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';

import RootNavigator from '../navigations/RootNavigator';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import loader from '../assets/loader.gif';
import {setLoginResponse, setFromLoginScreen} from '../redux/action';
import {getUserDetails} from '../storage';

//
const DeliveryBoyContainer = props => {
  const [initialScreen, setInitialScreen] = useState(undefined);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const userdetails = await getUserDetails();
    console.log('user details :::', userdetails);

    if (userdetails) {
      props.setLoginResponse(userdetails);
      props.setFromLoginScreen(true);

      if (
        !userdetails.user.isEmailVerified ||
        !userdetails.user.isMobileNumberVerified
      ) {
        setInitialScreen('OTPVerification');
        return;
      }

      if (!userdetails.user.isKYCDocSubmitted || !userdetails.user.isKYCDone) {
        setInitialScreen('DBStattusView');
        return;
      }

      setInitialScreen('Drawer');
    } else {
      setInitialScreen('Login');
    }
  };

  return (
    <SafeAreaView style={styles.root}>
      {initialScreen ? (
        <RootNavigator initialRouteName={initialScreen} />
      ) : null}

      {props.isFetching ? (
        <View style={styles.indicatorParent}>
          <ActivityIndicator size="large" color="#313381" />
        </View>
      ) : null}
    </SafeAreaView>
  );
};

// export default DeliveryBoyContainer;
const styles = StyleSheet.create({
  root: {flex: 1},
  indicatorParent: {
    height: '100%',
    width: '100%',
    marginTop: 20,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => ({
  isFetching: state.app.isFetching,
});

export default connect(
  mapStateToProps,
  {setLoginResponse, setFromLoginScreen},
)(DeliveryBoyContainer);
