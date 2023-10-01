import React, {Fragment, useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {ActivityIndicator, Searchbar, Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearErrors,
  getDeals,
  getMoreDeals,
  searchDeals,
} from '../actions/dealsAction';
import BannerAdScreen from '../components/BannerAdScreen';
import {config} from '../config';
import {showToast} from '../layouts/alert';
import DealGrid from '../layouts/DealGrid';
import Loader from '../layouts/Loader';
import Search from '../layouts/Search';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, data, error, nextPage} = useSelector(state => state.deals);
  const moreDeals = useSelector(state => state.moreDeals.data);
  const anotherPage = useSelector(state => state.moreDeals.nextPage);
  const loadingMore = useSelector(state => state.moreDeals.loading);
  const searchData = useSelector(state => state.search.data);
  const [searchQuery, setSearchQuery] = useState('');
  const [nextDealsPage, setNextDealPage] = useState('');
  const [isSearched, setIsSearched] = useState(false);

  const {width} = useWindowDimensions();
  const [refreshing, setRefreshing] = useState(false);
  const [deals, setDeals] = useState('');

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(getDeals()).then(() => setRefreshing(false));
  }, []);

  const onChangeSearch = query => {
    setSearchQuery(query);
    submitSearchDeals(searchQuery);
  };

  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
    if (moreDeals) {
      setDeals(prevData => [...prevData, ...moreDeals.data]);
      setNextDealPage(anotherPage);
    }
    if (searchQuery.length > 0) {
      setIsSearched(true);
    } else {
      setIsSearched(false);
    }
  }, [error, moreDeals, searchQuery]);

  useEffect(() => {
    setDeals(data ? data.data : null);
    setNextDealPage(nextPage);
  }, [data]);

  useEffect(() => {
    dispatch(getDeals());
  }, []);

  //load more function
  const loadMoreDeals = () => {
    if (nextDealsPage != null) {
      dispatch(getMoreDeals(nextDealsPage));
    }
  };

  const submitSearchDeals = query => {
    dispatch(searchDeals(query));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.Container}>
          <Searchbar
            style={styles.searchBar}
            inputStyle={styles.inpStyle}
            placeholder="Search"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={() => submitSearchDeals(searchQuery)}
            onIconPress={() => submitSearchDeals(searchQuery)}
          />
          {isSearched ? (
            <Search
              data={searchData}
              navigation={navigation}
              width={width}
              query={searchQuery}
            />
          ) : (
            <FlatList
              ListHeaderComponent={<BannerAdScreen type={2} />}
              ListHeaderComponentStyle={{width: width, paddingHorizontal: 5}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
              renderItem={({item, index}) => (
                <>
                  <DealGrid data={item} reactNavigation={navigation} />
                </>
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
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    position: 'relative',
  },
  searchBar: {
    marginBottom: 5,
  },
  inpStyle: {
    color: config.Blue_Color,
  },
  dealGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default HomeScreen;
