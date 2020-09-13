import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';

import {connect} from 'react-redux';
import NavHeader from '../components/header/HeaderWithBack';
import Header from '../components/base/Header';
import InputText from '../components/base/InputText';
import Button from '../components/base/Button';
import {updatePassword} from '../redux/action';

const ChangePassword = props => {
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onChangePassword = async () => {
    if (!oldPassword) {
      Alert.alert('Error', 'Please enter old password');
      return;
    }

    if (!newPassword) {
      Alert.alert('Error', 'Please enter new password');
      return;
    }

    if (!confirmPassword) {
      Alert.alert('Error', 'Please enter confirm password');
      return;
    }

    if (newPassword != confirmPassword) {
      Alert.alert('Error', 'New password and confirm password should be same');
      return;
    }

    const request = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    const {error, response} = await props.updatePassword(request);

    if (!error) {
      Alert.alert(
        'Success',
        response.message,
        [{text: 'OK', onPress: () => props.navigation.pop()}],
        {cancelable: false},
      );
    }
  };

  return (
    <View style={{flex: 1}}>
      <NavHeader {...props} />
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <Header
          text={'Change your password'}
          style={{fontSize: 20, marginVertical: 10}}
        />

        <InputText
          placeholder={'Old Password'}
          textStyle={{marginTop: 30}}
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
        />
        <InputText
          placeholder={'New Password'}
          textStyle={{marginTop: 30}}
          secureTextEntry={true}
          value={newPassword}
          onChangeText={text => setNewPassword(text)}
        />
        <InputText
          placeholder={'Confirm Password'}
          textStyle={{marginTop: 30}}
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        />

        <Button
          text={'Change Password'}
          buttonStyle={{marginTop: 30}}
          onPress={() => onChangePassword()}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  userDetails: state.user.userDetails,
  isFetching: state.app.isFetching,
});

export default connect(
  mapStateToProps,
  {updatePassword},
)(ChangePassword);
