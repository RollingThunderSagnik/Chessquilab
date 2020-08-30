// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
// import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import PropTypes from 'prop-types';
// import Chessboard from './chessboard';
import RootStackScreen from './RootStackScreen';

const App = () => {
    return (
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
    );
  };

export default App;

