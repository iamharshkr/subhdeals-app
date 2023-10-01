import Clipboard from '@react-native-clipboard/clipboard';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import {
  Badge,
  Button,
  Divider,
  FAB,
  List,
  Text,
  useTheme,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {getPopularDeals, getProductDetails} from '../actions/dealsAction';
import Icon, {Icons} from '../components/Icons';
import {config} from '../config';
import Loader from '../layouts/Loader';
import {showToast} from '../layouts/alert';
import DealGrid from '../layouts/DealGrid';
import onShare from '../components/share';
import getTime from '../components/getTime';
import BannerAdScreen from '../components/BannerAdScreen';

const ProductInfo = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {loading, data} = useSelector(state => state.productDetails);
  const {popularDeals} = useSelector(state => state.deals);
  const {width} = useWindowDimensions();
  const [html, setHtml] = useState('');
  const theme = useTheme();
  const copyText = text => {
    Clipboard.setString(text);
    showToast('Coupon copied to clipboard');
  };

  useEffect(() => {
    if (route.params.id) {
      dispatch(getProductDetails(route.params.id));
    }
    dispatch(getPopularDeals());
  }, [route]);

  useEffect(() => {
    setHtml(
      data
        ? `<div style="color:${theme.colors.text}">${data.productInfo}</div>`
        : null,
    );
  }, [data, theme]);

  const getDiscount = (mrp, sell) => {
    return 100 - parseInt((sell / mrp) * 100) + '%';
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : data ? (
        <>
          <ScrollView
            backgroundColor={theme.colors.background}
            contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
              {data.MaxPrice > 0 && data.SellPrice > 0 ? (
                <Badge style={styles.badge}>
                  <Icon color="orange" type={Icons.FontAwesome5} name="bolt" />
                  <Text style={styles.badgeText}>
                    {getDiscount(data.MaxPrice, data.SellPrice)}
                  </Text>
                </Badge>
              ) : null}
              <View elevation={5} style={[styles.imgContainer, styles.shadow]}>
                <Image
                  style={styles.img}
                  source={{
                    uri:
                      'https://deals.subhdeals.com/media/images/' +
                      data.productImage,
                  }}
                />
                <Image
                  style={[
                    styles.storeLogo,
                    {right: width > 800 ? '40%' : '33%'},
                  ]}
                  source={{
                    uri:
                      'https://deals.subhdeals.com/media/stores/' +
                      data.SellerName.toLowerCase() +
                      '.png',
                  }}
                />
              </View>
            </View>
            <Divider style={styles.divider} />
            <View style={styles.container}>
              <Text style={styles.title}>{data.name}</Text>
              <View style={styles.infoContainer}>
                <View style={styles.priceMainContainer}>
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
                </View>
                <View style={styles.viewContainer}>
                  <Icon
                    style={styles.views}
                    type={Icons.FontAwesome5}
                    name="eye"
                  />
                  <Text style={styles.views}>{data.views}</Text>
                </View>
              </View>
              <View style={styles.Notice}>
                {data.Notice ? (
                  <Text style={styles.NoticeTxt}>{data.Notice}</Text>
                ) : null}
                {data.coupon ? (
                  <View style={styles.couponContainer}>
                    <Icon
                      style={styles.coupon}
                      type={Icons.FontAwesome5}
                      name="cut"
                    />
                    <Text style={styles.coupon}>{data.coupon}</Text>
                    <TouchableOpacity onPress={() => copyText(data.coupon)}>
                      <Icon
                        style={styles.coupon}
                        type={Icons.FontAwesome5}
                        name="copy"
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
              <TouchableOpacity
                onPress={() => Linking.openURL(data.productUrl)}>
                <Button
                  elevation={5}
                  style={[styles.btn, styles.shadow]}
                  mode="contained">
                  <Icon
                    color={'#fff'}
                    type={Icons.FontAwesome5}
                    name="shopping-bag"
                  />{' '}
                  <Text style={{color: '#fff', fontWeight: '900'}}>
                    Shop Now
                  </Text>
                </Button>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  margin: 5,
                }}>
                <Icon
                  style={styles.views}
                  type={Icons.FontAwesome5}
                  name="clock"
                />
                <Text style={styles.views}>
                  {getTime(data.updated_at) + ' ago'}
                </Text>
              </View>
            </View>
            <Divider style={styles.divider} />
            <LinearGradient
              colors={['#4c669f', '#3b5998', '#192f6a']}
              style={styles.linearGradient}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://subhdeals.com/ref=telegram')
                }
                style={styles.banner}>
                <Text style={styles.telegramTxt}>
                  Join Our Telegram Channel
                </Text>
                <Icon
                  color={'#fff'}
                  size={30}
                  type={Icons.FontAwesome5}
                  name="telegram"
                />
              </TouchableOpacity>
            </LinearGradient>
            <BannerAdScreen type={1} />
            <View style={styles.container}>
              <View>
                {data.post_type != 'article' ? (
                  <Text style={styles.description}>Product Description</Text>
                ) : null}
                {html ? (
                  <RenderHTML
                    style={styles.productInfo}
                    fontStyle={{color: theme.colors.text}}
                    contentWidth={width}
                    source={{html: html}}
                  />
                ) : null}
              </View>
              <View
                elevation={5}
                style={[
                  styles.extraContainer,
                  styles.shadow,
                  {backgroundColor: theme.colors.background},
                ]}>
                <View>
                  <Text style={styles.extraTitle}>HOW TO BUY THIS DEAL ?</Text>
                </View>
                <View>
                  <List.Item
                    titleStyle={styles.extraTxt}
                    title="Visit deal page."
                  />
                  <List.Item
                    titleStyle={styles.extraTxt}
                    title="Add product to cart. Login or register."
                  />
                  <List.Item
                    titleStyle={styles.extraTxt}
                    title="Update or select shipping details."
                  />
                  <List.Item
                    titleStyle={styles.extraTxt}
                    title="Pay the amount."
                  />
                  <List.Item
                    titleStyle={[styles.extraTxt, {color: '#ffcc00'}]}
                    titleNumberOfLines={3}
                    title="Note: Sometimes you may see difference in product price due to “Different Seller” or “Offer Ended”."
                  />
                </View>
              </View>
            </View>
            <BannerAdScreen type={2} />
            {popularDeals ? (
              <View style={styles.container}>
                <Text style={styles.mostViewedProducts}>Popular Deals</Text>
                <FlatList
                  horizontal
                  pagingEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  data={popularDeals.data}
                  keyExtractor={(item, index) => `key-${index}`}
                  renderItem={({item}) => (
                    <DealGrid data={item} reactNavigation={navigation} />
                  )}
                />
              </View>
            ) : null}
          </ScrollView>
          <FAB
            icon="share"
            style={styles.fab}
            color={'#fff'}
            onPress={() => onShare(data)}
          />
        </>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  imgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
    backgroundColor: '#fff',
    position: 'relative',
  },
  storeLogo: {
    position: 'absolute',
    bottom: '5%',
    height: 32,
    width: '100%',
    resizeMode: 'contain',
    overflow: 'hidden',
  },
  badge: {
    backgroundColor: config.Green_Color,
    position: 'absolute',
    top: '8%',
    right: '8%',
    zIndex: 10,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  badgeText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '800',
  },
  img: {
    width: 200,
    height: 200,
  },
  divider: {
    height: 2,
  },
  title: {
    fontSize: 20,
    color: config.Blue_Color,
    fontWeight: 'bold',
    textAlign: 'justify',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceMainContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    marginVertical: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  maxPrice: {
    fontSize: 18,
    color: 'red',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  dealPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: config.Green_Color,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  views: {
    fontSize: 16,
    fontWeight: '700',
    color: 'gray',
    marginHorizontal: 2,
  },
  Notice: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  NoticeTxt: {
    backgroundColor: config.Blue_Color,
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    padding: 5,
    borderRadius: 30,
  },
  couponContainer: {
    backgroundColor: '#8ff5a9',
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderColor: '#00a531',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 10,
  },
  coupon: {
    fontSize: 18,
    fontWeight: '900',
    color: 'black',
    marginHorizontal: 5,
  },
  btn: {
    backgroundColor: config.Theme_Color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
  },
  telegramTxt: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  description: {
    fontSize: 22,
    fontWeight: '900',
  },
  extraContainer: {
    borderColor: config.Theme_Color,
    borderWidth: 1,
    padding: 5,
  },
  extraTitle: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '700',
  },
  extraTxt: {
    fontSize: 16,
    fontStyle: 'italic',
    fontWeight: '700',
    marginVertical: -6,
  },
  mostViewedProducts: {
    fontSize: 20,
    fontWeight: '900',
    marginLeft: 5,
  },
  fab: {
    position: 'absolute',
    bottom: '5%',
    right: '5%',
  },
});

export default ProductInfo;
