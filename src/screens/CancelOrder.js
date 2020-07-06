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

const CancelOrder = props => {
  const [cancelOrder, setCancelOrder] = useState(false);
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
          text={cancelOrder ? 'No Pickup' : 'Cancel Order'}
          style={{fontSize: 20, marginVertical: 10, marginLeft: 10}}
        />

        <View style={{flex: 1}}>
          {cancelOrder ? (
            <View style={styles.listSubItem}>
              <Text style={styles.valueText}>Order Id</Text>
              <View
                style={[styles.listDivider, {width: '100%', marginTop: 10}]}
              />
              <Text
                style={[
                  styles.valueText,
                  {marginTop: 16, color: 'rgba(84,190,231,1)'},
                ]}>
                #123123123123
              </Text>

              <Text style={[styles.valueText, {marginTop: 16}]}>
                Order Details
              </Text>
              <View
                style={[styles.listDivider, {width: '100%', marginTop: 10}]}
              />
            </View>
          ) : null}

          <View>
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>From Location</Text>
              <Text style={styles.valueText} numberOfLines={2}>
                Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park, Hi-Tec
                City Madhapur, Hyderabad, AP 500 081 India
              </Text>
            </View>
            <View style={styles.listDivider} />
            <View style={styles.listSubItem}>
              <Text style={styles.labelText}>To Location</Text>
              <Text style={styles.valueText} numberOfLines={2}>
                Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park, Hi-Tec
                City Madhapur, Hyderabad, AP 500 081 India
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

          {cancelOrder ? (
            <View style={styles.bottomButtonParent}>
              <SmallButton
                buttonStyle={styles.declineButton}
                text={'ASSIGN TO DB'}
                onPress={() => props.navigation.push('AssignToNextDB')}
              />
              <View style={{width: 10}} />
              <SmallButton
                buttonStyle={styles.declineButton}
                text={'ASSIGN TO HEADQUARTER'}
                onPress={() => {}}
              />
            </View>
          ) : (
            <View style={styles.bottomButtonParent}>
              {/* <SmallButton
              buttonStyle={styles.declineButton}
              text={'COMPLETE ORDER'}
            /> */}
              {/* <View style={{width: 10}} /> */}
              <SmallButton
                buttonStyle={styles.acceptButton}
                text={'CANCEL ORDER'}
                onPress={() => setCancelOrder(true)}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default CancelOrder;
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
    alignSelf: 'flex-end',
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
});
