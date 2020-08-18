import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chessboard.png')//{ uri: "https://reactjs.org/logo-og.png" };
const tsize = chsize/8;

class pospos extends Component {
  
}

class Piece extends Component {
  state = {
    left: 0,
    top: 0
  }
  constructor(props)
  {
    super(props);
    this._onPressSend = this._onPressSend.bind(this);
  }

  _onPressSend(){
    this.setState({left : this.state.left+1});
    console.log(this.state.messages);
  }

  render()
  {
    return (
      <View>
      <TouchableWithoutFeedback onPress={this._onPressSend}>
      <View style={{
        backgroundColor: '#09f',
        width: tsize,
        height: tsize,
        left: this.state.left*tsize,
        top: this.state.top*tsize
      }}>
        <Text>{this.state.left + "," + this.state.top}</Text>
      </View>
      </TouchableWithoutFeedback>
      </View>
    );

  }
}

class Chessboard extends Component {
  render()
  {
    return (
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      alignItems : 'center',
      }}>
      
      <ImageBackground source={require('./assets/chessboard.png')} style={styles.image}>
      <Piece></Piece>
      </ImageBackground>

    </View>
    );
  }
}

class App extends Component {
  render()
  {
    return (
      <View style={styles.container}>
        <Chessboard></Chessboard>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: chsize,
    height: chsize,
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
