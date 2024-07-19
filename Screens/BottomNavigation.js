import { Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import Cart from './Cart';
import Search from './Search';
import Profile from './Profile';



const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route, }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home-outline'

                    }
                    else if (route.name === 'Search') {
                        iconName = focused
                            ? 'search'
                            : 'search-outline'
                    }
                    else if (route.name === 'Cart') {
                        iconName = focused
                            ? 'cart'
                            : 'cart-outline'
                    }
                    else if (route.name === 'Profile') {
                        iconName = focused
                            ? 'person-circle'
                            : 'person-circle-outline'
                    }

                    return <Icon name={iconName} size={32} color={color} style={{ marginTop: -5 }} />;

                },
                tabBarShowLabel: false,
                tabBarActiveTintColor: 'green',
                tabBarInactiveTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: 'black',
                    height: 70,
                    paddingBottom: 10,
                },
            })}



        >
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='Search' component={Search} />
            <Tab.Screen name='Cart' component={Cart} />
            <Tab.Screen name='Profile' component={Profile} />

        </Tab.Navigator>
    )

}