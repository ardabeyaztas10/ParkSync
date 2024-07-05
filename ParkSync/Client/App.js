import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Components/HomeScreen'; 
import LoginScreen from './Components/LoginScreen';
import SignupScreen from './Components/SignupScreen';
import ParkScreen from './Components/ParkScreen';
import ProfilScreen from './Components/ProfilPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: 'ParkSync', headerLeft: null }} 
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Giriş Yap' }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{ title: 'Kayıt Ol' }} 
        />
        <Stack.Screen 
          name="Park" 
          component={ParkScreen} 
          options={{ title: 'Park Durumu', headerLeft: null  }} 
        />
        <Stack.Screen 
          name="Profile" 
          component={ProfilScreen} 
          options={{ title: 'Profil'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}