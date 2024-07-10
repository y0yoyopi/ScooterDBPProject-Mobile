import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Profile from './Profile';
import Booking from './Booking';
import TourSpotterTools from './TourSpotterTools';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Booking'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Booking') {
            iconName = 'ticket';
          } else if (route.name === 'Profile') {
            iconName = 'account';
          } else if (route.name === 'TourSpotterTools') {
            iconName = 'tools';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        headerShown: false,  // Ocultar el encabezado para todas las pantallas en BottomTabs
      })}
    >
      <Tab.Screen name="TourSpotterTools" component={TourSpotterTools} />
      <Tab.Screen name="Booking" component={Booking} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
