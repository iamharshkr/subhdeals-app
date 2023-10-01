import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Icon, {Icons} from './Icons';
import deviceInfo from 'react-native-device-info';
import {Switch, useTheme} from 'react-native-paper';
import {config} from '../config';
import {useDispatch, useSelector} from 'react-redux';
import {setTheme} from '../actions/themeAction';

const CustomDrawers = props => {
  const dispatch = useDispatch();
  const {darkMode} = useSelector(state => state.theme);

  const onToggleSwitch = () => {
    dispatch(setTheme(!darkMode));
  };
  const theme = useTheme();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView style={{marginVertical: 10}} {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View style={{padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'}}>
        <View style={styles.sections}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type={Icons.Ionicons}
              style={{color: theme.colors.text, marginRight: 5}}
              size={20}
              name={darkMode ? 'moon-outline' : 'sunny-outline'}
            />
            <Text style={styles.Text}>Dark mode</Text>
          </View>
          <View style={styles.darkMode}>
            <Switch
              onValueChange={onToggleSwitch}
              style={{color: theme.colors.text}}
              value={darkMode}
            />
          </View>
        </View>
        <TouchableOpacity onPress={() => {}} style={{paddingVertical: 15}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              type={Icons.Ionicons}
              style={{color: theme.colors.text}}
              name="share-social-outline"
              size={22}
            />
            <Text
              style={{
                fontSize: 15,
                marginLeft: 5,
                color: theme.colors.text,
              }}>
              Tell a Friend
            </Text>
          </View>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            type={Icons.Ionicons}
            style={{color: theme.colors.text}}
            name="logo-android"
            size={22}
          />
          <Text
            style={{
              fontSize: 15,
              marginLeft: 5,
              color: theme.colors.text,
            }}>
            App Version: {deviceInfo.getVersion()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sections: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: -26,
  },
  Text: {
    fontSize: 15,
    color: config.Blue_Color,
    fontWeight: '700',
  },
  darkMode: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomDrawers;
