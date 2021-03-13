import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import Aloitus from './Aloitus';
import Resepti from './Resepti';
import Kamera from './Kamera';
import Lista from './RavintolaLista';
import Kartta from './Kartta';
import Muistio from './muistio';

import { Card, Banner } from 'react-native-paper';

function StackNav() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Aloitus" component={Aloitus} />
      <Stack.Screen name="Resepti" component={Resepti} />
      <Stack.Screen name="Kamera" component={Kamera} />
      <Stack.Screen name="Lista" component={Lista} />
      <Stack.Screen name="Kartta" component={Kartta} />
      <Stack.Screen name="Omat reseptit" component={Muistio} />
    </Stack.Navigator>
  );
}

export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Aloitus') {
              iconName = 'md-home-sharp';
            } else if (route.name === 'Resepti') {
              iconName = 'md-book';
            } else if (route.name === 'Kamera') {
              iconName = 'md-camera';
            } else if (route.name === 'Omat reseptit') {
              iconName = 'md-clipboard';
            } else if (route.name === 'Kartta') {
              iconName = 'md-map';
            } else if (route.name === 'Lista') {
              iconName = 'md-restaurant';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Aloitus" component={Aloitus} />
        <Tab.Screen name="Resepti" component={Resepti} />
        <Tab.Screen name="Kamera" component={Kamera} />
        <Tab.Screen name="Lista" component={Lista} />
        <Tab.Screen name="Omat reseptit" component={Muistio} />
        <Tab.Screen name="Kartta" component={Kartta} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
