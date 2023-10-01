import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Text} from 'react-native-paper';
import {config} from '../config';

const StoreGrid = ({data, reactNavigation}) => {
  const {width} = useWindowDimensions();
  return (
    <>
      {data.map((item, i) => (
        <View
          elevation={5}
          key={i}
          style={[
            styles.grid,
            {width: width > 800 ? width / 3 - 11 : width / 2 - 11},
          ]}>
          <TouchableOpacity
            onPress={() =>
              reactNavigation.navigate({
                name: 'StoreDetails',
                params: {slug: item.Slug},
              })
            }>
            <View style={styles.innerContainer}>
              <Image
                style={styles.storeImg}
                source={{
                  uri: 'https://deals.subhdeals.com/media/' + item.Image,
                }}
              />
              <Text style={styles.storeTxt}>{item.Name}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginHorizontal: 5,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  storeImg: {
    height: 50,
    width: '90%',
    resizeMode: 'contain',
  },
  storeTxt: {
    fontSize: 18,
    fontWeight: '700',
    color: config.Blue_Color,
  },
});

export default StoreGrid;
