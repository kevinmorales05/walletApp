import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParams} from '../utils';
import LoginController from '../screens/auth/Login/LoginController';
import WelcomeController from '../screens/auth/Welcome/WelcomeController';
import OnboardingController from '../screens/auth/Onboarding/OnboardingController';
import LoginUserController from '../screens/auth/LoginUser/LoginUserController';

const Stack = createNativeStackNavigator<AuthStackParams>();

const AuthStack: React.FC = () => (
  <Stack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName="LoginUser">
    <Stack.Screen name="Onboarding" component={OnboardingController} />
    <Stack.Screen name="Login" component={LoginController} />
    <Stack.Screen name="Welcome" component={WelcomeController} />
    <Stack.Screen name="LoginUser" component={LoginUserController} />
  </Stack.Navigator>
);

export default AuthStack;
