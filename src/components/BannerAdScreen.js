import React from 'react';
import {View} from 'react-native';
import {BannerAd, BannerAdSize} from 'react-native-google-mobile-ads';
import {useTheme} from 'react-native-paper';
import {config} from '../config';

const BannerAdScreen = ({type}) => {
  const theme = useTheme();
  return (
    <View
      style={{
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        overflow: 'hidden',
        backgroundColor: theme.colors.background,
      }}>
      <BannerAd
        unitId={config.Banner_Ad_Unit}
        size={
          type === 1
            ? BannerAdSize.INLINE_ADAPTIVE_BANNER
            : BannerAdSize.ANCHORED_ADAPTIVE_BANNER
        }
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export default BannerAdScreen;
