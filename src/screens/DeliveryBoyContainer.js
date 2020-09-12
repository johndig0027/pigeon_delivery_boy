/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StyleSheet,
  Platform,
} from 'react-native';

import RootNavigator from '../navigations/RootNavigator';
import {SafeAreaView} from 'react-navigation';
import {connect} from 'react-redux';
import loader from '../assets/loader.gif';
import {
  setLoginResponse,
  setFromLoginScreen,
  updateOrderStatus,
  startLocationTracking,
  setSelectedOrder,
  saveUserToken,
  setDeviceToken,
} from '../redux/action';
import {getUserDetails, getOrderDetails} from '../storage';

import BackgroundTimer from 'react-native-background-timer';
import Geolocation from 'react-native-geolocation-service';

import messaging from '@react-native-firebase/messaging';
import firebase from '@react-native-firebase/app';

const defaultAppMessaging = firebase.messaging();
// const credentials = {
//   clientId: '',
//   appId: '1:732743233427:android:e6a2079da7b397250e0266',
//   apiKey: 'AIzaSyCb-g3ZwbrSPq7zPMFb7zf5xfuvg-fZofo',
//   databaseURL: '',
//   storageBucket: '',
//   messagingSenderId: '',
//   projectId: 'pigeon-271207',
// };

// const config = {
//   name: 'SECONDARY_APP',
// };

// firebase.initializeApp(credentials, config);
//
const DeliveryBoyContainer = props => {
  const [initialScreen, setInitialScreen] = useState(undefined);
  let watchId = null;
  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = async () => {
    const userdetails = await getUserDetails();

    console.log('user details :::', userdetails);
    //
    if (userdetails) {
      const currentOrderDetails = await getOrderDetails();
      console.log('Current Order details :::', currentOrderDetails);

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

      if (
        currentOrderDetails &&
        (currentOrderDetails.orderStatus === 'COLLECTING' ||
          currentOrderDetails.orderStatus === 'INPROGRESS')
      ) {
        await props.setSelectedOrder(currentOrderDetails);
        props.startLocationTracking();
      }
      setInitialScreen('Drawer');
    } else {
      setInitialScreen('Login');
    }
    checkPermission();
  };

  const checkPermission = async () => {
    const enabled = await defaultAppMessaging.hasPermission();
    if (enabled) {
      getToken();
    } else {
      requestPermission();
    }
  };

  const requestPermission = async () => {
    try {
      await defaultAppMessaging.requestPermission();
      // If user allow Push Notification
      getToken();
    } catch (error) {
      // If user do not allow Push Notification
      console.log('Rejected');
    }
  };

  //Get Device Registration Token
  const getToken = async () => {
    const fcmToken = await defaultAppMessaging.getToken();
    console.log('fcm Token', fcmToken);
    props.setDeviceToken(fcmToken);
    props.saveUserToken(fcmToken);
    // // let fcmToken = await AsyncStorage.getItem('fcmToken');
    // if (!fcmToken) {
    //   if (fcmToken) {
    //     console.log('fcmToken:', fcmToken);
    //     await AsyncStorage.setItem('fcmToken', fcmToken);
    //   }
    // }
  };

  useEffect(() => {
    if (props.locationTracking) {
      startLocationSending();
    } else {
      if (Platform.OS === 'android') {
        BackgroundTimer.stopBackgroundTimer();
        // KeepAwake.deactivate();
      } else {
        if (watchId) {
          Geolocation.stopObserving(watchId);
          // KeepAwake.deactivate();
        }
      }
    }
  }, [props.locationTracking]);

  const startLocationSending = () => {
    if (Platform.OS === 'android') {
      // startLocationUpdateForAndroid();
      BackgroundTimer.runBackgroundTimer(() => {
        //code that will be called every 3 seconds
        Geolocation.getCurrentPosition(
          position => {
            console.log(
              'Watch on:::',
              'lat : ' +
                position.coords.latitude +
                'long : ' +
                position.coords.longitude,
            );

            const request = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              orderStatus: props.selectedOrder.orderStatus,
              pigeonId: props.selectedOrder.pigeonId,
            };
            props.updateOrderStatus(request);

            // let accuracy = !isNaN(position.coords.accuracy)
            //   ? position.coords.accuracy
            //   : 0;

            // if (lastLatLong.current) {
            //   const distance = getDistance(lastLatLong.current, {
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            //   });

            //   if (distance > 7 || appCurrentState.current == 'background') {
            //     props.sendLocationFrequently(
            //       props.userDetails.username,
            //       position.coords.latitude,
            //       position.coords.longitude,
            //       accuracy.toFixed(1),
            //     );
            //   }
            // console.log("Diff Distance", distance);
            // ToastAndroid.show(
            //   "Distance  ! " +
            //     distance +
            //     "\n Lat : " +
            //     position.coords.latitude +
            //     " \n long : " +
            //     position.coords.longitude,
            //   ToastAndroid.LONG
            // );
            // } else {
            //   lastLatLong.current = {
            //     latitude: position.coords.latitude,
            //     longitude: position.coords.longitude,
            //   };
            //   props.sendLocationFrequently(
            //     props.userDetails.username,
            //     position.coords.latitude,
            //     position.coords.longitude,
            //     accuracy.toFixed(1),
            //   );
            // }
            // if (!alarmTunedOf.current) {
            //   // console.log("Stop Watch:::", watchId);
            //   BackgroundTimer.stopBackgroundTimer();
            //   setAlarm(false);
            //   KeepAwake.deactivate();
            // }
          },
          error => {
            // console.log("error", error);
            if (error.code == 1) {
              // openSetting();
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0,
            distanceFilter: 0,
          },
        );
      }, 10000);
    } else {
      // getContinuesLocation();
      watchId = Geolocation.watchPosition(
        position => {
          // this.setState({ location: position });
          console.log(
            'Watch on:::',
            'lat : ' +
              position.coords.latitude +
              'long : ' +
              position.coords.longitude,
          );

          // let accuracy = !isNaN(position.coords.accuracy)
          //   ? position.coords.accuracy
          //   : 0;

          const request = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            orderStatus: props.selectedOrder.orderStatus,
            pigeonId: props.selectedOrder.pigeonId,
          };
          props.updateOrderStatus(request);

          // let distance = 0;
          // if (lastLatLong.current) {
          //   distance = getDistance(
          //     lastLatLong.current,
          //     {
          //       latitude: position.coords.latitude,
          //       longitude: position.coords.longitude
          //     },
          //     0.5
          //   );
          //   console.log("Diff Distance", distance);
          // }

          // // if (distance == 0 || distance > 50) {
          // lastLatLong.current = {
          //   latitude: position.coords.latitude,
          //   longitude: position.coords.longitude
          // };

          // props.sendLocationFrequently(
          //   props.userDetails.username,
          //   position.coords.latitude,
          //   position.coords.longitude,
          //   accuracy.toFixed(1),
          // );
          // }

          // if (!alarmTunedOf.current) {
          //   // console.log("Stop Watch:::", watchId);
          //   Geolocation.stopObserving(watchId);
          //   setAlarm(false);
          //   KeepAwake.deactivate();
          // }
        },
        error => {
          // this.setState({ location: error });
          console.log(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 30,
          interval: 30000,
          fastestInterval: 30000,
          forceRequestLocation: true,
        },
      );
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
  selectedOrder: state.order.selectedOrder,
  locationTracking: state.order.locationTracking,
});

export default connect(
  mapStateToProps,
  {
    setLoginResponse,
    setFromLoginScreen,
    updateOrderStatus,
    startLocationTracking,
    setSelectedOrder,
    saveUserToken,
    setDeviceToken,
  },
)(DeliveryBoyContainer);
