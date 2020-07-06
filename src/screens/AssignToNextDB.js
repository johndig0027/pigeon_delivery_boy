import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {Colors} from '../theme';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Hedear from '../components/base/Header';
import SmallButton from '../components/base/SmallButton';
import Icon from '../assets/icons';
import db from '../assets/profile.jpg';

const AssignToNextDB = props => {
  let mapObj = null;
  const [code, setCode] = useState();
  const [details, showDetails] = useState(false);
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
          text={'Assign to DB'}
          style={{fontSize: 20, marginVertical: 10, marginLeft: 10}}
        />
        <View style={{height: '45%', backgroundColor: 'red'}}>
          <MapView
            ref={ref => (mapObj = ref)}
            style={{height: '100%'}}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapTheme}
            initialRegion={{
              latitude: 18.508357,
              longitude: 73.810067,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            scrollEnabled={false}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'space-between'}}>
          <View>
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>Current DB</Text>

              <View style={styles.mainParentView}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={db}
                    style={{height: 50, width: 50, borderRadius: 25}}
                  />
                  <View style={{marginLeft: 16}}>
                    <Text style={styles.valueText} numberOfLines={2}>
                      Rahul Nakate
                    </Text>
                    <Text style={styles.valueText} numberOfLines={2}>
                      9920826261
                    </Text>
                  </View>
                </View>

                <View style={{marginRight: -60}}>
                  <Text style={styles.otpTextLabel}>OTP</Text>

                  <OTPInputView
                    style={styles.otpView}
                    pinCount={3}
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
              </View>
              <View style={styles.listDivider} />
            </View>

            <TouchableOpacity onPress={() => showDetails(!details)}>
              <Text style={styles.summaryText}>Current Order Summery</Text>
            </TouchableOpacity>
            <View style={styles.listDivider} />
          </View>
          {details ? (
            <ScrollView>
              <View>
                <View style={styles.listSubItem}>
                  <Text style={styles.labelText}>From Location</Text>
                  <Text style={styles.valueText} numberOfLines={2}>
                    Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park,
                    Hi-Tec City Madhapur, Hyderabad, AP 500 081 India
                  </Text>
                </View>
                <View style={styles.listDivider} />
                <View style={styles.listSubItem}>
                  <Text style={styles.labelText}>To Location</Text>
                  <Text style={styles.valueText} numberOfLines={2}>
                    Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park,
                    Hi-Tec City Madhapur, Hyderabad, AP 500 081 India
                  </Text>
                </View>
                <View style={styles.listDivider} />
                <View style={styles.listSubItem}>
                  <Text style={styles.labelText}>Mobile Numbers</Text>
                  <Text style={styles.valueText} numberOfLines={1}>
                    +91 9878783238,+91 9878783238,
                  </Text>
                </View>
                <View style={styles.listDivider} />
                <View style={styles.listSubItem}>
                  <Text style={styles.labelText}>Package Weight</Text>
                  <Text style={styles.valueText} numberOfLines={1}>
                    3.5 KG
                  </Text>
                </View>
                <View style={styles.listDivider} />
                <View style={styles.listSubItem}>
                  <Text style={styles.labelText}>Total Cost</Text>
                  <Text style={styles.valueText} numberOfLines={1}>
                    100.20/- INR
                  </Text>
                </View>
                <View style={styles.listDivider} />
              </View>
            </ScrollView>
          ) : null}

          <View style={styles.bottomButtonParent}>
            {/* <SmallButton buttonStyle={styles.declineButton} text={'Decline'} /> */}
            <View style={{width: 10}} />
            <SmallButton
              buttonStyle={styles.acceptButton}
              text={'SUBMIT'}
              onPress={() => props.navigation.push('AcceptOrderOTP')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssignToNextDB;
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
  acceptButton: {flex: 1, backgroundColor: Colors.buttonBlue, width: '40%'},
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
  },
  bottomButtonParent: {
    height: 40,
    flexDirection: 'row',

    width: '50%',
    alignSelf: 'center',
  },

  borderStyleHighLighted: {
    borderColor: Colors.appGreen,
    fontSize: 25,
  },

  underlineStyleBase: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 12,
    color: Colors.appBlue,
    fontFamily: 'ProzaLibre-Bold',
  },

  underlineStyleHighLighted: {
    borderRadius: 5,
    backgroundColor: 'white',
    fontSize: 12,
  },
  otpView: {
    width: '40%',
    height: 30,
    fontSize: 12,
    fontFamily: 'ProzaLibre-Medium',
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    alignSelf: 'center',
    elevation: 3,
  },
  otpTextLabel: {
    fontSize: 16,
    fontFamily: 'ProzaLibre-Medium',
    color: Colors.appBlue,
    alignSelf: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontFamily: 'ProzaLibre-Medium',
    color: Colors.appBlue,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  mainParentView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
  },
});
