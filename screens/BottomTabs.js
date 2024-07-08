import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

//import ActivityScreen from './ActivityScreen';
import Profile from './Profile';
import Booking from './Booking';

const BottomTabs = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator
            initialRouteName='Profile'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    } /*else if (route.name === 'Activity') {
                        iconName = 'chart-line';
                    } */else if (route.name === 'Profile') {
                        iconName = 'account';
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="Booking" component={Booking} />
            {/*<Tab.Screen name="Activity" component={ActivityScreen} />*/}
            <Tab.Screen name="Profile" component={Profile} />
            
            
        </Tab.Navigator>
    )
}

export default BottomTabs