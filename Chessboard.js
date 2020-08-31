import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import { EventRegister} from 'react-native-event-listeners';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chessboard.png')//{ uri: "https://reactjs.org/logo-og.png" };
const tsize = chsize/8;

var positions = [];
var c=0;
for(let i=5;i<8;i++)
  for(let j=0;j<8;j++)
    positions.push(
      {
        id:c++,
        x:j,
        y:i
      });



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
      var validmoves = this._getValidMoves(this.state.left,this.state.top);
      var moves = validmoves.map((cood) => <Pospos onPress={this._Move} key={validmoves.indexOf(cood)} top={cood.y} left={cood.x}></Pospos>);
     this.setState({nextmove: moves});
    }

  _getValidMoves(left,top)
  {
    var move =[{x: left, y:top-1},{x: left, y:top-2}]
      var validmoves=[];
      for(let i=0;i<move.length;i++)
      {
        var indx = (positions.findIndex( (piece) => {return ((piece.x==move[i].x)&&(piece.y==move[i].y))}));
        if(indx == -1)
          validmoves.push(move[i]);
      }
    return validmoves;
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
    
  _Move(nx,ny){

    positions[this.props.id] = {
      id: this.props.id,
      x: nx,
      y: ny
    };
    EventRegister.emit('movemade');
    EventRegister.emit('clearpos');
  }  

  render()
  {
    return (
      <View>
      <TouchableWithoutFeedback onPress={this._onShowMoves}>
      <View style={{
        margin: 0,
        padding: 0,
        backgroundColor: this.state.color || '#09f',
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

class Pawn extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];
    for(let i=1;i<3;i++)
    {
      var saysaysay = {x:left, y:top-i};
      var indx = (positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))}));
      if(indx >= 0)
        break;
      else
        validmoves.push(saysaysay);
    }
    return validmoves;
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

class Rook extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];

    //going up
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    return validmoves;
  }
}

class Bishop extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];

    //going up-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going up-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    return validmoves;
  }
}

class Queen extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {

    var validmoves=[];

    //going up
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going up-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going down-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top+i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    //going up-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top-i};
      if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }

    return validmoves;
  }

  
}

class Knight extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];
    var kiws = [1,-1];

    for(let i=1;i<3;i++)
    {
      for(let j=0;j<2;j++)
      {
        for(let k=0;k<2;k++)
        {
        var saysaysay = {x:left+kiws[k]*kiws[j]*(3-i), y:top+kiws[j]*i};
        if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
          {}
        else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
          {}
        else
          validmoves.push(saysaysay);
        }
      }
    }


    return validmoves;
  }

}

class King extends Piece {
  constructor(props){
    super(props);
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];
    var kiws = [1,0,-1];

    for(let i=0;i<3;i++)
    {
      for(let j=0;j<3;j++)
      {
        var saysaysay = {x:left+kiws[i], y:top+kiws[j]};
        if((positions.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
          {}
        else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
          {}
        else
          validmoves.push(saysaysay);
      }
    }


    return validmoves;
  }

}

class Chessboard extends Component {
  
  state = {
    piecedeets : positions
  }

  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('movemade', () => {
      this.setState({
        piecedeets : positions
      });
    });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render()
  {
    var pisces = this.state.piecedeets.map( (item) => <Rook key={item.id} id={item.id} left={item.x} top={item.y}></Rook>);

    return (
      
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      }}>
      
      <ImageBackground source={image} style={styles.image}>
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