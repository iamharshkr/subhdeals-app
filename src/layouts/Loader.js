import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { config } from '../config';

const Loader = () => {
  return (
    <View style={styles.ActivityIndicator}>
      <ActivityIndicator color={config.Theme_Color} size={55} animating={true} />
    </View>
  );
};
const styles = StyleSheet.create({
  ActivityIndicator: {
    position: 'absolute',
    top: '50%',
    bottom: '50%',
    left: '50%',
    right: '50%',
    backgroundColor: 'gray',
    zIndex: 1000
  },
});
export default Loader;
