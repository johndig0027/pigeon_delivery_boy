import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
} from 'react-native';
import {Colors} from '../theme';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Hedear from '../components/base/Header';
import SmallButton from '../components/base/SmallButton';
import Icon from '../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {connect} from 'react-redux';
import {
  collectOrder,
  updateSelectedOrderStatus,
  startLocationTracking,
} from '../redux/action';
import box from '../assets/icons/box.png';
import deliveryBoy from '../assets/icons/delivery.png';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const AcceptOrderOTP = props => {
  let mapObj = useRef();
  const [lineCoordinate, setLineCoordinate] = useState([]);
  const [userLocation, setUserLocation] = useState();
  const [code, setCode] = useState();
  const onCodeFilled = async codeText => {
    console.log(codeText);
    // setCodeFilled(true);
  };
  const mapTheme = [
    {
      elementType: 'geometry',
      stylers: [
        {
          color: '#f5f5f5',
        },
      ],
    },
    {
      elementType: 'geometry.fill',
      stylers: [
        {
          color: '#f4f6fb',
        },
      ],
    },
    {
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#313381',
        },
      ],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'administrative.land_parcel',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#bdbdbd',
        },
      ],
    },
    {
      featureType: 'administrative.neighborhood',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'poi.business',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [
        {
          color: '#ffffff',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#757575',
        },
      ],
    },
    {
      featureType: 'road.highway',
      stylers: [
        {
          color: '#d6d6d6',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        {
          color: '#dadada',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#616161',
        },
      ],
    },
    {
      featureType: 'road.local',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
    {
      featureType: 'transit',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        {
          color: '#e5e5e5',
        },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry',
      stylers: [
        {
          color: '#eeeeee',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          color: '#c9c9c9',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [
        {
          color: '#9e9e9e',
        },
      ],
    },
  ];

  useEffect(() => {
    if (mapObj && userLocation) {
      const MARKERS = [
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
        {
          latitude: props.selectedOrder.toAddress.latitude,
          longitude: props.selectedOrder.toAddress.longitude,
        },
      ];
      const DEFAULT_PADDING = {top: 60, right: 40, bottom: 20, left: 40};

      mapObj.fitToCoordinates(MARKERS, {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });

      setLineCoordinate(MARKERS);
      // updateStatus('COLLECTING');
    }
  }, [mapObj, userLocation]);

  const getPaymentMethod = () => {
    const paymentMode = props.selectedOrder.paymentMode;
    var res = paymentMode.replace('_', ' ');
    return res;
  };

  const updateStatus = async status => {
    if (!code) {
      Alert.alert('Error', 'Please enter customer OTP');
      return;
    }

    if (code.length !== 6) {
      Alert.alert('Error', 'Please enter valid customer OTP');
      return;
    }

    const request = {
      lat: userLocation.latitude,
      lng: userLocation.longitude,
      orderStatus: status,
      pigeonId: props.selectedOrder.pigeonId,
      otp: parseInt(code),
    };

    const {error, response} = await props.collectOrder(request);
    console.log('Response >>>>', response);
    if (!error) {
      props.updateSelectedOrderStatus(status);
      props.startLocationTracking();
      props.navigation.replace('CurrentOrderPage');
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.navBarStyle}>
        <TouchableOpacity
          style={{width: 60, alignItems: 'center'}}
          onPress={() => props.navigation.pop()}>
          <Icon type={'back'} />
        </TouchableOpacity>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={{width: 60}} />
      </View>
      <View style={styles.subParent}>
        <Hedear
          text={'Order Accept'}
          style={{fontSize: 20, marginVertical: 10, marginLeft: 10}}
        />
        <View style={{height: '35%', backgroundColor: 'red'}}>
          <MapView
            ref={ref => (mapObj = ref)}
            style={{height: '100%'}}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapTheme}
            scrollEnabled={false}
            showsUserLocation={true}
            onUserLocationChange={coordinate => {
              setUserLocation(coordinate.nativeEvent.coordinate);
              // console.log('XXXXXXXXXXXX :', coordinate.nativeEvent.coordinate);
            }}>
            {userLocation ? (
              <Marker
                coordinate={{
                  latitude: Number(userLocation.latitude),
                  longitude: Number(userLocation.longitude),
                }}
                calloutAnchor={{x: 0.45, y: 0.3}}
                icon={deliveryBoy}
                tracksViewChanges={false}
              />
            ) : null}

            <Marker
              coordinate={{
                latitude: Number(props.selectedOrder.toAddress.latitude),
                longitude: Number(props.selectedOrder.toAddress.longitude),
              }}
              calloutAnchor={{x: 0.45, y: 0.3}}
              icon={box}
              tracksViewChanges={false}
            />

            {lineCoordinate && lineCoordinate.length === 2 ? (
              <Polyline
                coordinates={lineCoordinate}
                strokeColor="#000"
                fillColor={Colors.appBlue}
                strokeWidth={3}
                geodesic={true}
                lineDashPhase={2}
              />
            ) : null}
          </MapView>
        </View>

        <KeyboardAwareScrollView style={{flex: 1}}>
          <View style={{flex: 1, paddingHorizontal: 20}}>
            <View style={styles.otpView}>
              <View style={styles.otpSubParent}>
                <Text style={styles.otpHeader}>OTP</Text>
                <OTPInputView
                  style={styles.otpBoxView}
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

              <View style={styles.paymentParent}>
                <View style={styles.paymentView}>
                  <Text style={styles.whiteText}>PAYMENT</Text>
                  <Text style={styles.yellowText}>{getPaymentMethod()}</Text>
                </View>
                <View style={styles.blueDivider} />
                <View style={styles.paymentView}>
                  <Text style={styles.whiteText}>PAYMENT STATUS</Text>
                  <Text style={styles.yellowText}>Completed</Text>
                </View>
              </View>
            </View>

            <SmallButton
              buttonStyle={{width: '40%', alignSelf: 'center', marginTop: 40}}
              text={'START'}
              onPress={() => updateStatus('INPROGRESS')}
            />
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

// export default AcceptOrderOTP;

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  selectedOrder: state.order.selectedOrder,
});

// export default SearchLocation;
export default connect(
  mapStateToProps,
  {collectOrder, updateSelectedOrderStatus, startLocationTracking},
)(AcceptOrderOTP);
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
  declineButton: {flex: 1, backgroundColor: Colors.appRed},
  acceptButton: {flex: 1, backgroundColor: Colors.appGreen},
  logoStyle: {
    height: 60,
    resizeMode: 'contain',
    width: '40%',
  },
  listDivider: {
    height: 0.5,
    backgroundColor: 'rgba(207,212,215,1)',
    width: '80%',
    alignSelf: 'flex-end',
  },
  bottomButtonParent: {height: 40, flexDirection: 'row', paddingHorizontal: 16},

  otpView: {
    backgroundColor: Colors.headerBlue,
    marginTop: 30,
    borderRadius: 5,
  },
  otpSubParent: {
    height: 100,
    width: '100%',
    backgroundColor: Colors.buttonBlue,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    alignItems: 'center',
    elevation: 5,
    paddingVertical: 10,
  },
  otpHeader: {color: 'white', fontFamily: 'ProzaLibre-Bold'},
  borderStyleHighLighted: {
    borderColor: Colors.appGreen,
    fontSize: 25,
  },

  underlineStyleBase: {
    width: 35,
    height: 40,
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
  otpBoxView: {
    width: '70%',
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
  paymentView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  whiteText: {color: 'white', fontFamily: 'ProzaLibre-Medium'},
  yellowText: {color: '#EEFD5B', fontFamily: 'ProzaLibre-Medium'},
  blueDivider: {height: 1, backgroundColor: 'rgba(90,93,150,1)'},
  paymentParent: {height: '50%', paddingHorizontal: 16},
});
