import React, { Component } from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';


const AuthStack = createStackNavigator(
    {
        Login: {
            screen: LoginScreen,
            navigationOptions: {               
                header: null
            },
        },
        Register: {
            screen: RegisterScreen,            
        },
    },
    {
        initialRouteName: 'Login',
    }
);

const AppStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: {               
                header: null
            },
        },        
    },
    {
        initialRouteName: 'Home'        
    }
);

const switchNavigator = createSwitchNavigator(
    {
        AuthLoading: SplashScreen,        
        Auth: AuthStack,     
        App: AppStack   
    },
    {        
        initialRouteName: 'AuthLoading',
        headerMode: 'none',
    }
);

export default AppContainer = createAppContainer(switchNavigator);

console.disableYellowBox = true