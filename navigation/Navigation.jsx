import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons, Feather } from '@expo/vector-icons';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

import HomeScreen from '@/screens/homeStack/HomeScreen';
import { homeScreenOptions } from '@/screens/homeStack/homeScreenOptions';
import Promo, { screenOptions as PromoScreenOptions } from '@/screens/homeStack/PromoScreen';
import CashScreen from '@/screens/CashScreen';
import ExploreScreen, { screenOptions as ExploreScreenOptions } from '@/screens/ExploreScreen';
import ProfileScreen, { screenOptions as ProfileScreenOptions } from '@/screens/ProfileScreen';
import CompanyDetailScreen, { screenOptions as CompanyDetailScreenOptions } from '@/screens/CompanyDetailScreen';
import CryptoDetailScreen, { screenOptions as CryptoDetailScreenOptions } from '@/screens/CryptoDetailScreen';
import BasketDetailScreen, { screenOptions as BasketDetailScreenOptions } from '@/screens/BasketDetailScreen';
import BuyingPowerScreen, { screenOptions as BuyingPowerScreenOptions } from '@/screens/BuyingPowerScreen';

import { deviceWidth } from '@/constants/dimensions';
import Background from '@/components/UI/Background/Background';

const RootMainStackNavigator = createStackNavigator();
const HomeStackMainNavigator = createStackNavigator();
const CashStackNavigator = createStackNavigator();
const ExploreStackNavigator = createStackNavigator();
const ProfileStackNavigator = createStackNavigator();
const BottomNavigator = createBottomTabNavigator();


// Example: Home stack with transparent content
const HomeMainNavigator = () => (
  <HomeStackMainNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' },
    }}
  >
    <HomeStackMainNavigator.Screen
      name="Home"
      component={HomeScreen}
      options={homeScreenOptions}
    />
    <HomeStackMainNavigator.Screen
      name="CryptoDetail"
      component={CryptoDetailScreen}
      options={CryptoDetailScreenOptions}
    />
    <HomeStackMainNavigator.Screen
      name="CompanyDetail"
      component={CompanyDetailScreen}
      options={CompanyDetailScreenOptions}
    />
  </HomeStackMainNavigator.Navigator>
);

// Repeat for other stacks (Cash, Explore, Chat, Profile)
// Just make sure they all have `contentStyle: { backgroundColor: 'transparent' }`

const CashNavigator = () => (
  <CashStackNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' },
    }}
  >
    <CashStackNavigator.Screen name="Card" component={CashScreen} />
  </CashStackNavigator.Navigator>
);

const ExploreNavigator = () => (
  <ExploreStackNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' },
    }}
  >
    <ExploreStackNavigator.Screen
      name="Explore"
      component={ExploreScreen}
      options={ExploreScreenOptions}
    />
    <ExploreStackNavigator.Screen
      name="BasketDetail"
      component={BasketDetailScreen}
      options={BasketDetailScreenOptions}
    />
    <ExploreStackNavigator.Screen
      name="CompanyDetail"
      component={CompanyDetailScreen}
      options={CompanyDetailScreenOptions}
    />
    <ExploreStackNavigator.Screen
      name="CryptoDetail"
      component={CryptoDetailScreen}
      options={CryptoDetailScreenOptions}
    />
  </ExploreStackNavigator.Navigator>
);

const ProfileNavigator = () => (
  <ProfileStackNavigator.Navigator
    screenOptions={{
      headerShown: false,
      contentStyle: { backgroundColor: 'transparent' },
    }}
  >
    <ProfileStackNavigator.Screen
      name="Profile"
      component={ProfileScreen}
      options={ProfileScreenOptions}
    />
  </ProfileStackNavigator.Navigator>
);

const MainTabNavigator = () => (
  <BottomNavigator.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor:
        getFocusedRouteNameFromRoute(route) === 'CryptoDetail' ? '#fff' : '#e0e0e0',
      tabBarInactiveTintColor: '#888',
      tabBarShowLabel: false,
      tabBarStyle: {
        paddingHorizontal: deviceWidth / 20,
        borderTopColor: 'transparent',
        backgroundColor: '#1a1a1a', // solid dark gray bar
        position: 'absolute',
      },
      tabBarIcon: ({ color }) => {
        let iconName;
        if (route.name === 'Main') iconName = 'chart-area';
        else if (route.name === 'Cash') iconName = 'wallet';
        else if (route.name === 'Search') iconName = 'search';
        else if (route.name === 'Settings')
          return <Feather name="user" size={24} color={color} />;
        return <FontAwesome5 name={iconName} size={24} color={color} />;
      },
    })}
  >
    <BottomNavigator.Screen name="Main" component={HomeMainNavigator} />
    <BottomNavigator.Screen name="Cash" component={CashNavigator} />
    <BottomNavigator.Screen name="Search" component={ExploreNavigator} />
    <BottomNavigator.Screen name="Settings" component={ProfileNavigator} />
  </BottomNavigator.Navigator>
);


export const RootMainNavigator = () => {
  return (
    <Background>
      <RootMainStackNavigator.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'transparent' },
        }}
      >
        <RootMainStackNavigator.Screen name="Home" component={MainTabNavigator} />
        <RootMainStackNavigator.Screen name="Promo" component={Promo} options={PromoScreenOptions} />
      </RootMainStackNavigator.Navigator>
    </Background>
  );
};
