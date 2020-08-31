import React from 'react';
import {Animated, TouchableOpacity} from 'react-native';

const icons = {
  logo: require('./logo_white.png'),
  menu: require('./menu.png'),
  back: require('./back.png'),
  roundedclose: require('./rounded_close.png'),
  profile: require('./profile_sample.png'),
};

type Props = {
  type: string,
  style: Object,
  testID: string,
  imgStyle: Object,
};

const Icon = (props: Props) => (
  <Animated.Image
    source={typeof props.type === 'string' ? icons[props.type] : null}
    style={props.style}
    testID={props.testID}
  />
);

type iconButtonProps = Props & {
  onPress: () => void,
  style: Object,
  testID: string,
};

const IconButton = (props: iconButtonProps) => (
  <TouchableOpacity
    style={[styles.button, props.style]}
    onPress={props.onPress}
    testID={props.testID}>
    <Icon type={props.type} style={props.imgStyle} />
  </TouchableOpacity>
);

const styles = {
  button: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

Icon.Button = IconButton;

export default Icon;
