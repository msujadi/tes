import React from 'react';
import {
  StyleSheet,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from 'react-native';

import { Image as Picture } from 'react-native-elements';

type Props = {
  newImageStyle?: StyleProp<ViewStyle>;
  src?: string | null;
  type?: 'event' | 'banner' | 'square' | 'xLarge';
  resizeMode?: 'center' | 'contain' | 'stretch' | 'cover' | 'repeat';
};

export default function Image(props: Props) {
  let { src, type, resizeMode, newImageStyle, ...other } = props;

  return !src || src === null ? (
    <Picture
      source={require('../../assets/images/placeholder.jpg')}
      style={styles[type || 'square']}
      containerStyle={newImageStyle}
      PlaceholderContent={<ActivityIndicator />}
      resizeMode={resizeMode}
      {...other}
    />
  ) : (
    <Picture
      source={{ uri: src }}
      style={styles[type || 'square']}
      containerStyle={newImageStyle}
      PlaceholderContent={<ActivityIndicator />}
      resizeMode={resizeMode}
      {...other}
    />
  );
}

const styles = StyleSheet.create({
  square: {
    width: 54,
    height: 54,
    borderRadius: 4,
    alignSelf: 'center',
  },
  event: {
    width: 120,
    height: 56,
    borderRadius: 4,
  },
  banner: {
    width: 328,
    height: 100,
    // borderRadius: 20,
  },
  xLarge: {
    width: '100%',
    height: 240,
  },
});
