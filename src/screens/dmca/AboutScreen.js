import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import config from '../../config';

const AboutScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>About Us</Text>
      <Text style={styles.text}>
        Get best shopping offers, Loot offers, Promo codes and Coupon, Recharge
        offers, Freebies for top online shopping websites in india. We help our
        visiters to find best online deals available on internet, so that they
        can save huge amount of money while shopping Online. Join Subhdeals and
        start saving now.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'justify',
  },
});

export default AboutScreen;
