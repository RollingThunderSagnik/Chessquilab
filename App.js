// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
// import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// import PropTypes from 'prop-types';
// import Chessboard from './chessboard';
import RootStackScreen from './RootStackScreen';
import UserPage from './UserPage';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';


const App = () => {
    return (
      <NavigationContainer>
        <RootStackScreen />
      </NavigationContainer>
      // <UserPage/>
    );
  };

// export default App;
export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <App />
  </ApplicationProvider>
);

