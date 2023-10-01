/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import AppNavigator from './src/navigators/AppNavigator';
import {Appearance, SafeAreaView, StatusBar} from 'react-native';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
import DoubleTapToClose from './src/components/DoubleTapClose';
import {useInterstitialAd, AppOpenAd} from 'react-native-google-mobile-ads';
import {config} from './src/config';
import {setTheme} from './src/actions/themeAction';

const appOpenAd = AppOpenAd.createForAdRequest(config.Open_Ad_Unit, {
  requestNonPersonalizedAdsOnly: true,
});

const App = () => {
  const {darkMode} = useSelector(state => state.theme);
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  //Check Initial Screen
  const [isInitialScreen, setIsInitialScreen] = useState(true);
  const [theme, setDarkTheme] = useState();
  const isCurrentScreenInitialOne = state => {
    const route = state.routes[state.index];
    if (route.state) {
      // Dive into nested navigators
      return isCurrentScreenInitialOne(route.state);
    }
    return state.index === 0;
  };

  const DefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
    },
  };

  const DarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
    },
  };

  const {isLoaded, isClosed, load, show} = useInterstitialAd(
    config.Interstitial_Ad_Unit,
    {
      requestNonPersonalizedAdsOnly: true,
    },
  );

  useEffect(() => {
    //set dark mode
    dispatch(setTheme(Appearance.getColorScheme() === 'dark' ? true : false));
    try {
      // Preload an app open ad
      appOpenAd.load();

      // Show the app open ad when user brings the app to the foreground.
      appOpenAd.show();
    } catch {
      return;
    }
  }, []);

  useEffect(() => {
    // Start loading the interstitial straight away
    load();

    setDarkTheme(darkMode ? DarkTheme : DefaultTheme);
  }, [load, darkMode]);

  const showAds = () => {
    try {
      if (isLoaded) {
        show();
      }
    } catch {
      return;
    }
  };

  console.log(state);
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer
        theme={theme}
        onStateChange={state => {
          setIsInitialScreen(isCurrentScreenInitialOne(state));
          // showAds();
        }}>
        {isInitialScreen && <DoubleTapToClose />}
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            backgroundColor={config.Theme_Color}
            barStyle={darkMode ? 'dark-content' : 'light-content'}
          />
          <AppNavigator />
        </SafeAreaView>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
