import {FlatList, View} from 'react-native';
import React from 'react';
import FoodItem from './FoodItem';

const DiaryList = (props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={({item}) => <FoodItem item={item} />}
      />
    </View>
  );
};

export default DiaryList;
