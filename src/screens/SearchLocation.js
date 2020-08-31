/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Keyboard,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import {Colors} from '../theme';
import Icon from '../assets/icons';
import {searchAPI, getLatLongFromPlaceId} from '../redux/action/googleApi';
import {connect} from 'react-redux';
import {setAddress} from '../redux/action';
const SearchLocation = props => {
  const [searchText, setSearchText] = useState(undefined);
  const [resultList, setResultList] = useState([]);

  const onSearchTextChanged = async text => {
    console.log('Text>>>', text);
    setSearchText(text);
    const result = await searchAPI(text);
    setResultList(result);
    console.log('search Result >>>', result);
  };

  const renderItem = item => {
    return (
      <TouchableOpacity
        style={{
          height: 50,
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(228,228,228,1)',
          justifyContent: 'center',
        }}
        onPress={async () => {
          const result = await getLatLongFromPlaceId(item.item.place_id);
          result.address = item.item.description;
          console.log(result);
          props.setAddress(result);
          props.navigation.goBack();
        }}>
        <Text>{item.item.description}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.navHeader}>
        <Icon.Button type={'back'} onPress={() => props.navigation.goBack()} />
        <Text style={styles.navHeadertext}>Search Location</Text>
        <Icon.Button />
      </View>

      <View style={styles.searchParent}>
        <View style={styles.searchTextInputParent}>
          <TextInput
            style={styles.textInput}
            placeholder={'Search Location'}
            onChangeText={text => onSearchTextChanged(text)}
            value={searchText}
          />

          <View style={styles.closeBtParent}>
            {searchText ? (
              <Icon.Button
                type={'roundedclose'}
                imgStyle={{height: 20, width: 20}}
                onPress={() => {
                  setSearchText('');
                  setResultList([]);
                }}
              />
            ) : null}
          </View>
        </View>
      </View>

      <FlatList data={resultList} renderItem={renderItem} />
    </View>
  );
};
const mapStateToProps = state => ({});

// export default SearchLocation;
export default connect(
  mapStateToProps,
  {
    setAddress,
  },
)(SearchLocation);
const styles = StyleSheet.create({
  root: {flex: 1, backgroundColor: 'white'},
  middleParent: {
    width: '80%',
    backgroundColor: Colors.appGrey,
    borderRadius: 20,
    marginTop: '5%',
    paddingHorizontal: 16,
    alignSelf: 'center',
    maxHeight: '80%',
  },
  navHeader: {
    height: 56,
    backgroundColor: Colors.appBlue,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  navHeadertext: {
    fontFamily: 'ProzaLibre-Bold',
    fontSize: 18,
    color: 'white',
  },
  logoStyle: {
    marginTop: '10%',
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
  headerText: {marginVertical: 30, alignSelf: 'center'},
  searchLocationButton: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginTop: 24,
  },
  searchParent: {
    height: 60,
    backgroundColor: 'rgba(220,220,220,1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTextInputParent: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '95%',
    flexDirection: 'row',
  },
  textInput: {
    height: '100%',
    width: '90%',
    paddingLeft: 16,
    fontFamily: 'ProzaLibre-Regular',
    fontSize: 14,
  },
  closeBtParent: {
    height: '100%',
    width: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
