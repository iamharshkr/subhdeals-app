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
import {ActivityIndicator, Button, Text, useTheme} from 'react-native-paper';
import Icon, {Icons} from '../components/Icons';
import DealGrid from '../layouts/DealGrid';
import RenderHTML from 'react-native-render-html';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, getStoreDetails} from '../actions/storeAction';
import {config} from '../config';
import {showToast} from '../layouts/alert';
import Loader from '../layouts/Loader';
import BannerAdScreen from '../components/BannerAdScreen';
import {getMoreDeals} from '../actions/dealsAction';

const StoreDetails = ({route, navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, storeDetails, storeProducts} = useSelector(
    state => state.store,
  );
  const moreDeals = useSelector(state => state.moreDeals.data);
  const anotherPage = useSelector(state => state.moreDeals.nextPage);
  const loadingMore = useSelector(state => state.moreDeals.loading);
  const [deals, setDeals] = useState('');
  const [nextDealsPage, setNextDealPage] = useState('');
  const [html, setHtml] = useState('');
  const {width} = useWindowDimensions();
  const theme = useTheme();
  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (moreDeals) {
      setDeals(prevData => [...prevData, ...moreDeals.data]);
      setNextDealPage(anotherPage);
    }
  }, [error, moreDeals]);

  useEffect(() => {
    setDeals(storeProducts ? storeProducts.data : null);
    setNextDealPage(storeProducts ? storeProducts.next_page_url : null);

    return;
  }, [storeProducts]);

  useEffect(() => {
    setHtml(
      storeDetails
        ? `<div style="color:${theme.colors.text}">${storeDetails.Description}</div>`
        : null,
    );
  }, [storeDetails, theme]);
  useEffect(() => {
    dispatch(getStoreDetails(route.params.slug));
  }, []);

  //load more function
  const loadMoreDeals = () => {
    if (nextDealsPage != null) {
      dispatch(getMoreDeals(nextDealsPage));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : storeDetails && storeProducts ? (
        <View
          style={[
            styles.dealsContainer,
            {backgroundColor: theme.colors.background},
          ]}>
          <>
            <FlatList
              ListHeaderComponent={
                <>
                  <View
                    elevation={5}
                    style={[
                      styles.container,
                      styles.shadow,
                      {backgroundColor: theme.colors.background},
                    ]}>
                    <View style={styles.storeContainer}>
                      <View style={styles.imgContainer}>
                        <View
                          elevation={5}
                          style={[
                            styles.imgMain,
                            styles.shadow,
                            {width: width / 3},
                          ]}>
                          <Image
                            style={styles.storeImg}
                            source={{
                              uri:
                                'https://deals.subhdeals.com/media/' +
                                storeDetails.Image,
                            }}
                          />
                        </View>
                      </View>
                      <View style={styles.details}>
                        <Text style={styles.name}>{storeDetails.Name}</Text>
                        <TouchableOpacity
                          onPress={() =>
                            Linking.openURL(storeDetails.Store_url)
                          }>
                          <Button
                            elevation={5}
                            style={[styles.btn, styles.shadow]}
                            mode="contained">
                            <Text style={styles.btnTxt}>Visit Store </Text>
                            <Icon
                              style={styles.btnTxt}
                              type={Icons.FontAwesome5}
                              name="check-circle"
                            />
                          </Button>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {html ? (
                      <RenderHTML
                        style={styles.Info}
                        contentWidth={width}
                        source={{html: html}}
                      />
                    ) : null}
                  </View>
                  <BannerAdScreen type={2} />
                  {deals && deals.length > 0 ? (
                    <Text style={styles.extraTxt}>Deals</Text>
                  ) : (
                    <Text style={styles.noDeals}>No deals are posted yet.</Text>
                  )}
                </>
              }
              contentContainerStyle={{
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              key={width}
              numColumns={width > 800 ? 3 : 2}
              showsHorizontalScrollIndicator={false}
              data={deals}
              keyExtractor={(item, index) => `key-${index}`}
              renderItem={({item}) => (
                <DealGrid data={item} reactNavigation={navigation} />
              )}
              onEndReached={loadMoreDeals}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                loadingMore ? (
                  <ActivityIndicator
                    style={{marginVertical: 5}}
                    color={config.Theme_Color}
                    size={55}
                    animating={true}
                  />
                ) : null
              }
            />
          </>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  container: {
    padding: 5,
  },
  storeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imgContainer: {
    padding: 5,
    borderRightColor: 'gray',
    borderRightWidth: 2,
  },
  imgMain: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 0.5,
    marginRight: 8,
  },
  storeImg: {
    height: 100,
    width: '90%',
    resizeMode: 'contain',
  },
  details: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  name: {
    fontSize: 25,
    fontWeight: '900',
    color: config.Blue_Color,
    marginVertical: 5,
  },
  btn: {
    backgroundColor: config.Theme_Color,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  btnTxt: {
    color: '#fff',
    fontWeight: '800',
    marginHorizontal: 5,
  },
  dealsContainer: {
    marginTop: 8,
  },
  extraTxt: {
    fontSize: 20,
    fontWeight: '700',
    color: config.Green_Color,
    margin: 5,
  },
  dealGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDeals: {
    fontSize: 20,
    fontWeight: '700',
    color: 'red',
    marginVertical: 8,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});
export default StoreDetails;
