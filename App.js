import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Home from './Screens/Home/Home';
import FoodAdder from './Screens/FoodAdder/FoodAdder';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});

const Stack = createStackNavigator();

const FlatListBasics = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Food Adder" component={FoodAdder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default FlatListBasics;
