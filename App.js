import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Splash from './Screens/Splash';
import Home from './Screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigation from './Screens/BottomNavigation';
import Detail from './Screens/Detail';
import app from './Firebase';

import { Provider } from 'react-redux';
import store from './Components/redux/store';
import Login from './Screens/Login';
import SignUp from './Screens/Signup';


const Stack = createNativeStackNavigator();


const fetchFonts = () => {
  return Font.loadAsync({
    'IslandMoments-Regular': require('./assets/fonts/Island_Moments/IslandMoments-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(error) => console.warn(error)}
      />
    );
  }

  return (
    <Provider store={store}>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
            <Stack.Screen name="Detail" component={Detail} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />


          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </Provider>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regularText: {
    fontFamily: 'IslandMoments-Regular',
    fontSize: 20,
  },
  boldText: {
    fontFamily: 'IslandMoments-Regular',
    fontSize: 20,
  },
});
