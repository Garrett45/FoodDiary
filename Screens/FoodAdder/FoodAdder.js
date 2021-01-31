import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FoodForm from './FoodForm';
import FoodsList from './FoodsList';
import Icon from 'react-native-vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

const FoodAdder = ({navigation}) => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Created Items':
              iconName = 'list';
              break;
            case 'Item Creator':
              iconName = 'edit';
              break;
          }

          return <Icon name={iconName} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00BFFF',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Created Items" component={FoodsList} />
      <Tab.Screen name="Item Creator" component={FoodForm} />
    </Tab.Navigator>
  );
};

export default FoodAdder;
