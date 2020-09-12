import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import backImage from '../assets/bg_screen.png';
import profile from '../assets/profile.jpg';
import Icon from '../assets/icons';
import {logout, resetUser} from '../redux/action';
import {connect} from 'react-redux';
import FastImage from 'react-native-fast-image';

const DrawerView = props => {
  console.log('props Drawer ', props);
  const [senderImageLoadedError, setSenderImageLoadingError] = useState(false);

  const logOutUser = async () => {
    const {error, response} = await props.logout();
    if (!error) {
      props.navigation.replace('Login');
      props.resetUser();
    }
  };

  const showConfirmAlert = () => {
    Alert.alert(
      'Message',
      'Are you sure, you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => logOutUser(),
        },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  };

  const getNameInitial = (firstName, lastName) => {
    return firstName.charAt(0) + lastName.charAt(0);
  };

  return (
    <ImageBackground style={styles.root} source={backImage}>
      <View style={styles.imageParent}>
        {/* <Image source={profile} style={styles.profileImage} /> */}

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

        <Text style={styles.nameText}>
          {props.userDetails
            ? props.userDetails.firstName + ' ' + props.userDetails.lastName
            : ''}
        </Text>
      </View>

      <View style={{justifyContent: 'space-between', flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('Home');
            }}>
            <View style={styles.iconParent}>
              <Icon type={'home'} />
            </View>
            <Text style={styles.listText}>Home</Text>
          </TouchableOpacity>
          <View style={styles.listDivider} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              props.navigation.toggleDrawer();
              props.navigation.navigate('CompletedOrders');
            }}>
            <View style={styles.iconParent}>
              <Icon type={'box'} />
            </View>
            <Text style={styles.listText}>Order Completed</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.toggleDrawer()}>
            <View style={styles.iconParent}>
              <Icon type={'payment'} />
            </View>
            <Text style={styles.listText}>Payment Status</Text>
          </TouchableOpacity>
          <View style={styles.listDivider} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.toggleDrawer()}>
            <View style={styles.iconParent}>
              <Icon type={'person'} />
            </View>
            <Text style={styles.listText}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.listDivider} />

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.toggleDrawer()}>
            <View style={styles.iconParent}>
              <Icon type={'settings'} />
            </View>
            <Text style={styles.listText}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.listDivider} />
        </ScrollView>

        <View style={{height: 60}}>
          <View style={[styles.listDivider, {marginLeft: 0}]} />
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => {
              props.navigation.toggleDrawer();
              showConfirmAlert();
            }}>
            <Icon type={'logout'} style={{height: 40, width: 40}} />
            <Text style={[styles.listText, {marginLeft: 10, fontSize: 20}]}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

// export default DrawerView;

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  orderList: state.order.orderList,
  isFetching: state.app.isFetching,
});

// export default SearchLocation;
export default connect(
  mapStateToProps,
  {
    logout,
    resetUser,
  },
)(DrawerView);
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
  iconParent: {
    borderRadius: 17.5,
    borderColor: 'white',
    borderWidth: 1,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  logoutButton: {
    height: 59,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
