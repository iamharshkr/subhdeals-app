import React from 'react';
import {FlatList, View} from 'react-native';
import {Text} from 'react-native-paper';
import * as Animatable from 'react-native-animatable';
import DealGrid from './DealGrid';

const Search = ({data, navigation, width, query}) => {
  return (
    <Animatable.View animation="fadeInRightBig" style={{flex: 1}}>
      <View style={{flexDirection: 'row', marginHorizontal: 5}}>
        <Text style={{fontSize: 15, marginRight: 5}}>Search result for</Text>
        <Text style={{fontSize: 15, fontWeight: '700'}}>{query}</Text>
      </View>
      {data && data.data.length > 0 ? (
        <FlatList
          contentContainerStyle={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          key={width}
          numColumns={width > 800 ? 3 : 2}
          showsHorizontalScrollIndicator={false}
          data={data.data}
          keyExtractor={(item, index) => `key-${index}`}
          renderItem={({item}) => (
            <DealGrid data={item} reactNavigation={navigation} />
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={{color: 'red', fontSize: 25, fontWeight: '700'}}>
            Opps!!!
          </Text>
          <Text style={{color: 'red', fontSize: 25, fontWeight: '700'}}>
            No Result Found
          </Text>
        </View>
      )}
    </Animatable.View>
  );
};

export default Search;
