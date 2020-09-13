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
import {connect} from 'react-redux';
import DrawerHeader from '../components/header/DrawerHeader';
import FastImage from 'react-native-fast-image';
import InputText from '../components/base/InputText';
import Button from '../components/base/Button';

const ProfileScreen = props => {
  const [senderImageLoadedError, setSenderImageLoadingError] = useState(false);
  const getNameInitial = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0);
  };

  return (
    <View style={{flex: 1}}>
      <DrawerHeader {...props} />

      <ScrollView style={{paddingHorizontal: 16}}>
        <View style={{alignItems: 'center', marginVertical: 30}}>
          {props.userDetails &&
          props.userDetails.photoURL &&
          !senderImageLoadedError ? (
            <FastImage
              source={{
                uri: props.userDetails.phtoUrl,
                priority: FastImage.priority.normal,
              }}
              onError={error => setSenderImageLoadingError(true)}
              style={styles.profileImage}
            />
          ) : (
            <View style={styles.profileViewImage}>
              <Text style={{color: 'white', fontFamily: 'ProzaLibre-Bold'}}>
                {getNameInitial(
                  props.userDetails.firstName,
                  props.userDetails.lastName,
                )}
              </Text>
            </View>
          )}
        </View>
        <Text style={styles.labelText}>Username</Text>
        <InputText value={props.userDetails.username} editable={false} />

        <Text style={styles.labelText}>First Name</Text>
        <InputText value={props.userDetails.firstName} editable={false} />

        <Text style={styles.labelText}>Last Name</Text>
        <InputText value={props.userDetails.lastName} editable={false} />

        <Text style={styles.labelText}>Mobile</Text>
        <InputText value={props.userDetails.mobile} editable={false} />

        <Text style={styles.labelText}>Email</Text>
        <InputText value={props.userDetails.email} editable={false} />

        <Button
          buttonStyle={{marginTop: 30}}
          text={'Change Password'}
          onPress={() => {
            props.navigation.push('ChangePassword');
          }}
        />
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  isFetching: state.app.isFetching,
});

export default connect(
  mapStateToProps,
  {},
)(ProfileScreen);

const styles = StyleSheet.create({
  root: {
    flex: 1,
    opacity: 0.9,
  },
  imageParent: {
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    fontSize: 14,
    color: '#2e2e2e',
    fontFamily: 'ProzaLibre-Regular',
    marginBottom: 5,
    marginTop: 20,
    marginLeft: 10,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
  },
  profileViewImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameText: {
    fontSize: 18,
    marginTop: 10,
    color: 'white',
    fontFamily: 'ProzaLibre-Bold',
  },
  listText: {
    fontSize: 16,
    color: 'white',
    fontFamily: 'ProzaLibre-Medium',
  },
  button: {
    height: 60,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 16,
  },
  listDivider: {
    height: 1,
    backgroundColor: 'white',
    opacity: 0.2,
    marginLeft: 16,
  },
});
