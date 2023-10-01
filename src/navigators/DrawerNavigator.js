import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import AboutScreen from '../screens/dmca/AboutScreen';
import PrivacyScreen from '../screens/dmca/PrivacyScreen';
import TermScreen from '../screens/dmca/TermScreen';
import BottomNavigator from './BottomNavigator';
import {Image} from 'react-native';
import {config} from '../config';
import Icon, {Icons} from '../components/Icons';
import CustomDrawers from '../components/CustomDrawers';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawers {...props} />}
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1b0651',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitle: props => <LogoTitle {...props} />,
        headerTitleAlign: 'center',
        drawerActiveBackgroundColor: config.Blue_Color,
        drawerActiveTintColor: '#fff',
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 18,
          fontWeight: '700',
        },
      }}>
      <Drawer.Screen
        options={{
          title: 'Home',
          drawerIcon: ({color}) => (
            <Icon
              type={Icons.Ionicons}
              name="home-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="BottomNavigator"
        component={BottomNavigator}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type={Icons.Ionicons}
              name="document-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="About"
        component={AboutScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: ({color}) => (
            <Icon
              type={Icons.Ionicons}
              name="chatbox-ellipses-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="Privacy"
        component={PrivacyScreen}
      />
      <Drawer.Screen
        options={{
          title: 'Terms & Conditions',
          drawerIcon: ({color}) => (
            <Icon
              type={Icons.Ionicons}
              name="shield-checkmark-outline"
              size={22}
              color={color}
            />
          ),
        }}
        name="Terms"
        component={TermScreen}
      />
    </Drawer.Navigator>
  );
};

function LogoTitle() {
  return (
    <Image
      style={{height: 50, width: 280}}
      source={require('../assets/images/logo.png')}
    />
  );
}

export default DrawerNavigator;
