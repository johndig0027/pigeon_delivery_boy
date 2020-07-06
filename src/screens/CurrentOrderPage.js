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
} from 'react-native';
import {Colors} from '../theme';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import Hedear from '../components/base/Header';
import SmallButton from '../components/base/SmallButton';
import Icon from '../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import db from '../assets/gmap.png';

const CurrentOrderPage = props => {
  let mapObj = null;
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

  const openGoogleMap = (lat, lng) => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${lat},${lng}`;
    const label = 'Custom Label';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
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
          text={'Start Order'}
          style={{fontSize: 20, marginVertical: 10, marginLeft: 10}}
        />
        <View style={styles.mapParent}>
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

          <View style={styles.directionButtonparent}>
            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => openGoogleMap(18.506811, 73.807063)}>
              <View style={styles.blankView} />
              <Text style={styles.registerText}>SHOW DIRECTION ON MAP</Text>
              <View style={styles.registerButtonRightCorner}>
                <Image source={db} style={styles.registerImage} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flex: 1, justifyContent: 'space-between'}}>
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

          <View style={styles.bottomButtonParent}>
            <SmallButton
              buttonStyle={styles.declineButton}
              text={'COMPLETE ORDER'}
              onPress={() => props.navigation.push('FinalOTPScreen')}
            />
            <View style={{width: 10}} />
            <SmallButton
              buttonStyle={styles.acceptButton}
              text={'CANCEL ORDER'}
              onPress={() => props.navigation.push('CancelOrder')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CurrentOrderPage;
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
  acceptButton: {flex: 1, backgroundColor: Colors.appRed},
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
  registerButton: {
    height: 50,
    backgroundColor: '#078424', //#1EC746
    width: '90%',
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
});
