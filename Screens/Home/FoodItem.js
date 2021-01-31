import React from 'react';
import {Text, View} from 'react-native';

const FoodItem = (props) => {
  return (
    <View>
      <Text>{props.item.value}</Text>
      <Text>{props.item.desc}</Text>
    </View>
  );
};

export default FoodItem;
