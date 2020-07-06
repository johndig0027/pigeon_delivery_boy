import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
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
import Hedear from '../components/base/Header';
import SmallButton from '../components/base/SmallButton';
import Icon from '../assets/icons';
import {TouchableOpacity} from 'react-native-gesture-handler';

const LiveOrderList = props => {
  const [refresh, setRefresh] = useState(false);
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-ff96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '58694a0f-3da1-471f-ff00-145571e29d72',
      title: 'Third Item',
    },
  ];

  const onRefresh = () => {};

  const getListItem = (item, index) => {
    console.log('index', index);
    console.log('Item', item);
    return (
      <View style={styles.item}>
        <View style={{width: 60}}>
          <View style={styles.indexParent}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={styles.listSubItem}>
            <Text style={styles.labelText}>From Location</Text>
            <Text style={styles.valueText} numberOfLines={2}>
              Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park, Hi-Tec
              City Madhapur, Hyderabad, AP 500 081 India
            </Text>
          </View>
          <View style={styles.listSubItem}>
            <Text style={styles.labelText}>To Location</Text>
            <Text style={styles.valueText} numberOfLines={2}>
              Unit No. 4, 9th Floor, Building No.20, MindSpace IT Park, Hi-Tec
              City Madhapur, Hyderabad, AP 500 081 India
            </Text>
          </View>
          <View style={styles.listSubItem}>
            <Text style={styles.labelText}>Mobile Numbers</Text>
            <Text style={styles.valueText} numberOfLines={1}>
              +91 9878783238,+91 9878783238,
            </Text>
          </View>
          <View style={styles.acceptButtonParent}>
            <SmallButton buttonStyle={styles.declineButton} text={'Decline'} />
            <View style={{width: 10}} />
            <SmallButton
              buttonStyle={styles.acceptButton}
              text={'Accept'}
              onPress={() => props.navigation.push('AcceptOrderDetails')}
            />
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.root}>
      <View style={styles.navBarStyle}>
        <TouchableOpacity style={{width: 60, alignItems: 'center'}}>
          <Icon type={'menu'} />
        </TouchableOpacity>
        <Icon type={'logo'} style={styles.logoStyle} />
        <View style={{width: 60}} />
      </View>
      <View style={styles.subParent}>
        <Hedear
          text={'Current Order'}
          style={{fontSize: 20, marginVertical: 10}}
        />

        <FlatList
          data={DATA}
          renderItem={({item, index}) => getListItem(item, index)}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refresh} onRefresh={onRefresh} />
          }
        />
      </View>
    </View>
  );
};

export default LiveOrderList;
const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'rgba(245,245,245,1)'},
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
  subParent: {flex: 1, paddingHorizontal: 16},
  listSubItem: {
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 0.5,
    borderColor: 'rgba(207,212,215,1)',
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
});
