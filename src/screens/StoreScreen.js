import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {clearErrors, getAllStores} from '../actions/storeAction';
import BannerAdScreen from '../components/BannerAdScreen';
import {config} from '../config';
import {showToast} from '../layouts/alert';
import Loader from '../layouts/Loader';
import StoreGrid from '../layouts/StoreGrid';

const StoreScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {loading, error, stores} = useSelector(state => state.store);

  useEffect(() => {
    if (error) {
      showToast(error);
      dispatch(clearErrors());
    }
  }, [error]);

  useEffect(() => {
    dispatch(getAllStores());

    return;
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : stores ? (
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.innerContainer}>
            <Text style={styles.storeTxt}>Affiliate Stores</Text>
          </View>
          <View style={styles.storeGrid}>
            <StoreGrid data={stores} reactNavigation={navigation} />
          </View>
          <BannerAdScreen type={1} />
        </ScrollView>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  innerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  storeTxt: {
    fontSize: 25,
    fontWeight: '900',
    color: config.Theme_Color,
  },
  storeGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default StoreScreen;
