import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chessboard.png')//{ uri: "https://reactjs.org/logo-og.png" };
const tsize = chsize/8;

var positions = [
    {id: 1,
     x:0,
     y:6
    },
    {id: 2,
     x:1,
     y:6
    },
    {id: 3,
     x:2,
     y:6
    },
    {id: 4,
     x:3,
     y:6
    },
    {id: 5,
     x:4,
     y:6
    },
    {id: 6,
     x:5,
     y:6
    },
    {id: 7,
     x:6,
     y:6
    },
    {id: 8,
     x:7,
     y:6
    },
    {id: 9,
     x:0,
     y:7
    },
    {id: 10,
     x:1,
     y:7
    },
    {id: 11,
     x:2,
     y:7
    },
    {id: 12,
     x:3,
     y:7
    },
    {id: 13,
     x:4,
     y:7
    },
    {id: 14,
     x:5,
     y:7
    },
    {id: 15,
     x:6,
     y:7
    },
    {id: 16,
     x:7,
     y:7
    },
]

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
        top: this.state.top*tsize,
        zIndex: 99
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
  }

  _onPressSend(){
    // this.setState({top : this.state.top-1});
    // console.log(this.state.messages);
     
      var moves = [<Pospos onPress={this._Move} key={0} top={this.state.top-1} left={this.state.left}></Pospos>,<Pospos onPress={this._Move} key={1} top={this.state.top-2} left={this.state.left}></Pospos>]
      this.setState({nextmove: moves});
    }

  _Move(x,y){
    this.setState({
      left: x,
      top: y,
      nextmove : []
    });
    // alert(this.props.id);
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
    // var pisces = [];
    // for(let i=0;i<=7;i++)
    // {
    //   pisces.push(<Piece key={i} id={i} left={i} top={6}></Piece>)
    //   pisces.push(<Piece key={8+i} id={8+i} left={i} top={7}></Piece>)
    // }

    var pisces = positions.map( (item) => <Piece key={item.id} id={item.id} left={item.x} top={item.y}></Piece>);

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

export default Chessboard;

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: chsize,
      height: chsize,
    }
});