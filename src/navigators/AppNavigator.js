import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import DrawerNavigator from './DrawerNavigator';
import ProductInfo from '../screens/ProductInfo';
import StoreScreen from '../screens/StoreScreen';
import StoreDetails from '../screens/StoreDetails';

const AppNavigator = ({route}) => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="DrawerNavigator"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1b0651',
        },
        headerTintColor: '#fff',
        headerShown: false,
        headerTitleStyle: {
          color: '#fff',
          fontSize: 18,
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          title: route.params.name,
        })}
        name="Product"
        component={ProductInfo}
      />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Store"
        component={StoreScreen}
      />
      <Stack.Screen
        options={({route}) => ({
          headerShown: true,
          title: route.params.slug.toUpperCase(),
        })}
        name="StoreDetails"
        component={StoreDetails}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
