// import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chessboard.png')//{ uri: "https://reactjs.org/logo-og.png" };
const tsize = chsize/8;

class Pospos extends Component {
  state = {
    left: this.props.left,
    top: this.props.top
  }
  constructor(props)
  {
    super(props);
    this._onConfirmMove = this._onConfirmMove.bind(this);
  }

  _onConfirmMove(){
  }

  render()
  {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.state.left,this.state.top)}>
      <View style={{
        borderColor : '#000',
        borderWidth: 1,
        borderRadius: tsize*0.5,
        margin: 0.25*tsize,
        padding: 0,
        backgroundColor: '#09f09f',
        width: 0.5*tsize,
        height: 0.5*tsize,
        position: "absolute",
        left: this.state.left*tsize,
        top: this.state.top*tsize
      }}>
      </View>
      </TouchableWithoutFeedback>
    );

  }
}

Pospos.propTypes = { onPress: PropTypes.func.isRequired };

class Piece extends Component {
  state = {
    left: this.props.left,
    top: this.props.top,
    nextmove: []
  }
  constructor(props)
  {
    super(props);
    this._onPressSend = this._onPressSend.bind(this);
    this._Move = this._Move.bind(this);
  }

  componentDidMount(){
    const c = new CustomEvent("clearpos", {
      detail: 
      {
      x : 0
      }
}); 
    Dimensions.addEventListener('clearpos',  (event) => {this.setState({nextmove: []})});
  }

  _onPressSend(){
    // this.setState({top : this.state.top-1});
    // console.log(this.state.messages);
      Dimensions.dispatchEvent(new CustomEvent("clearpos", {
            detail: 
            {
            x : 0
            }
      }));
      var moves = [<Pospos onPress={this._Move} key={0} top={this.state.top-1} left={this.state.left}></Pospos>,<Pospos onPress={this._Move} key={1} top={this.state.top-2} left={this.state.left}></Pospos>]
      this.setState({nextmove: moves});
    }

  _Move(x,y){
    this.setState({
      left: x,
      top: y,
      nextmove : []
    });
    alert(this.props.id);
  }  

  render()
  {
    return (
      <View>
      <TouchableWithoutFeedback onPress={this._onPressSend}>
      <View style={{
        margin: 0,
        padding: 0,
        backgroundColor: '#09f',
        width: tsize,
        height: tsize,
        position: "absolute",
        left: this.state.left*tsize,
        top: this.state.top*tsize
      }}>
        <Text>{this.state.left + "," + this.state.top+"\n"+this.props.id}</Text>
      </View>
      </TouchableWithoutFeedback>
      {this.state.nextmove}
      </View>
    );

  }
}

class Chessboard extends Component {
  render()
  {
    var pisces = [];
    for(let i=0;i<=7;i++)
    {
      pisces.push(<Piece key={i} id={i} left={i} top={6}></Piece>)
      pisces.push(<Piece key={8+i} id={8+i} left={i} top={7}></Piece>)
    }
    return (
      
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      alignItems : 'center',
      }}>
      
      <ImageBackground source={require('./assets/chessboard.png')} style={styles.image}>
      {pisces}
      </ImageBackground>
    </View>
    );
  }
}

class App extends Component {
  render()
  {
    return (
      <>
    <StatusBar barStyle='light-content'/>
      <View style={styles.container}>
        <Chessboard></Chessboard>
      </View>
      </>
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
