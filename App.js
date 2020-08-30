// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import Chessboard from './chessboard';

class App extends Component {
  render()
  {
    return (
      <>
    <StatusBar barStyle='light-content'/>
      <View style={{
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  }}>
        <Chessboard></Chessboard>
      </View>
      </>
    );
  }
}

export default App;

