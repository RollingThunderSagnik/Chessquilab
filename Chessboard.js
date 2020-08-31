import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import { EventRegister} from 'react-native-event-listeners';

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
    this._onShowMoves = this._onShowMoves.bind(this);
    this._Move = this._Move.bind(this);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('clearpos', () => {
        this.setState({
            nextmove: []
        });
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  _onShowMoves(){
      EventRegister.emit('clearpos');
      var move =[{x: this.state.left, y:this.state.top-1},{x: this.state.left, y:this.state.top-2}]
      var validmoves=[];
      for(let i=0;i<move.length;i++)
      {
        var indx = (positions.findIndex( (piece) => {return ((piece.x==move[i].x)&&(piece.y==move[i].y))}));
        if(indx == -1)
          validmoves.push(move[i]);
      }
      var moves = validmoves.map((cood) => <Pospos onPress={this._Move} key={validmoves.indexOf(cood)} top={cood.y} left={cood.x}></Pospos>);
     this.setState({nextmove: moves});
    }

    componentDidUpdate(prevProps) {
      if (this.props.left !== prevProps.left || this.props.top !== prevProps.top) {
         this.setState({ 
           left : this.props.left,
           top : this.props.top,
           }
         );
       }
    }
    
  _Move(x,y){
    this.setState({
      left: x,
      top: y,
      nextmove : []
    });
  }  

  render()
  {
    return (
      <View>
      <TouchableWithoutFeedback onPress={this._onShowMoves}>
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

  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('movemade', () => {
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render()
  {
    var pisces = positions.map( (item) => <Piece key={item.id} id={item.id} left={item.x} top={item.y}></Piece>);

    return (
      
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      }}>
      
      <ImageBackground source={require('./assets/chessboard.png')} style={styles.image}>
      {pisces}
      </ImageBackground>
    </View>
    );
  }
}

class ChessScreen extends Component {
  constructor(props)
  {
    super(props);
  }

  render()
  {
    return (<>
      <StatusBar barStyle='light-content'/>
      <View style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Chessboard></Chessboard>
      </View>
      </>);
  }
}

export default ChessScreen;

const styles = StyleSheet.create({
    image: {
      flex: 1,
      width: chsize,
      height: chsize,
    }
});