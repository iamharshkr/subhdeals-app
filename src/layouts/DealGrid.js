import React from 'react';
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {Badge, Button, Card} from 'react-native-paper';
import Icon, {Icons} from '../components/Icons';
import {config} from '../config';
import getTime from '../components/getTime';

const DealGrid = ({data, reactNavigation}) => {
  const {width} = useWindowDimensions();
  const getDiscount = (mrp, sell) => {
    return 100 - parseInt((sell / mrp) * 100) + '%';
  };
  return (
    <>
      {data ? (
        <View
          elevation={5}
          style={[
            styles.grid,
            {width: width > 800 ? width / 3 - 11 : width / 2 - 11},
          ]}>
          <Card>
            {data.MaxPrice > 0 && data.SellPrice > 0 ? (
              <Badge style={styles.badge}>
                {getDiscount(data.MaxPrice, data.SellPrice)}
              </Badge>
            ) : null}
            <View style={[styles.innerContainer, {position: 'relative'}]}>
              <TouchableOpacity
                onPress={() =>
                  reactNavigation.navigate({
                    name: 'Product',
                    params: {id: data.id, name: data.name},
                  })
                }
                style={{alignItems: 'center'}}>
                <Card.Cover
                  style={styles.img}
                  source={{
                    uri:
                      'https://deals.subhdeals.com/media/images/' +
                      data.productImage,
                  }}
                />
              </TouchableOpacity>
              <Image
                style={styles.storeLogo}
                source={{
                  uri:
                    'https://deals.subhdeals.com/media/stores/' +
                    data.SellerName.toLowerCase() +
                    '.png',
                }}
              />
              <View style={styles.timeLeftContainer}>
                <Icon
                  style={[styles.time, {marginRight: 3}]}
                  type={Icons.FontAwesome5}
                  name="clock"
                />
                <Text style={styles.time}>
                  {getTime(data.updated_at) + ' ago'}
                </Text>
              </View>
            </View>
            <Card.Content style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() =>
                  reactNavigation.navigate({
                    name: 'Product',
                    params: {id: data.id, name: data.name},
                  })
                }>
                <Text numberOfLines={2} style={styles.name}>
                  {data.name}
                </Text>
              </TouchableOpacity>
              {data.MaxPrice > 0 ? (
                <View style={styles.priceContainer}>
                  <Icon
                    style={[styles.maxPrice, {marginRight: 3}]}
                    type={Icons.FontAwesome5}
                    name={'rupee-sign'}
                  />
                  <Text style={styles.maxPrice}>{data.MaxPrice}</Text>
                </View>
              ) : null}
              {data.SellPrice > 0 ? (
                <View style={styles.priceContainer}>
                  <Icon
                    style={[styles.dealPrice, {marginRight: 3}]}
                    type={Icons.FontAwesome5}
                    name={'rupee-sign'}
                  />
                  <Text style={styles.dealPrice}>{data.SellPrice}</Text>
                </View>
              ) : null}
            </Card.Content>
            <Card.Actions style={styles.innerContainer}>
              <TouchableOpacity
                onPress={() => Linking.openURL(data.productUrl)}>
                <Button style={styles.btn} mode="contained">
                  Shop Now
                </Button>
              </TouchableOpacity>
            </Card.Actions>
          </Card>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  grid: {
    marginHorizontal: 5,
    marginVertical: 5,
    // backgroundColor: '#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    position: 'relative',
  },
  badge: {
    fontSize: 15,
    backgroundColor: config.Green_Color,
    color: '#fff',
    fontWeight: '800',
    position: 'absolute',
    top: '3%',
    right: '3%',
    zIndex: 10,
  },
  storeLogo: {
    position: 'absolute',
    height: 20,
    width: '100%',
    resizeMode: 'contain',
    bottom: '3%',
    right: '28%',
    overflow: 'hidden',
  },
  title: {
    fontSize: 15,
    lineHeight: 15,
  },
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 100,
    width: 100,
    marginVertical: 5,
  },
  timeLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 5,
    position: 'absolute',
    bottom: '1%',
    right: '1%',
  },
  time: {
    fontSize: 12,
    color: 'gray',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: config.Blue_Color,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxPrice: {
    color: 'gray',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    fontSize: 14,
  },
  dealPrice: {
    color: '#12b886',
    fontSize: 15,
    fontWeight: '700',
  },
  btn: {
    backgroundColor: config.Theme_Color,
  },
});

export default DealGrid;
