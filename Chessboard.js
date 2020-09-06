import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import { EventRegister} from 'react-native-event-listeners';
import {f, auth, database} from './config/config';
import { AppLoading } from 'expo';    

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chess.png');//{ uri: "https://reactjs.org/logo-og.png" };
const imgpawn = require('./assets/pawn.png');
const imgpawndark = require('./assets/pawn_dark.png');
const imgrook = require('./assets/rook.png');
const imgbishop = require('./assets/bishop.png');
const imgknight = require('./assets/knight.png');
const imgqueen = require('./assets/queen.png');
const imgking = require('./assets/king.png');

const tsize = chsize/8;


var user = f.auth().currentUser;
var userID;
var name, email, photoUrl, uid, emailVerified;

//add prole players
var prolesPos = [];
var c=0;
for(let i=5;i<8;i++)
  for(let j=0;j<8;j++)
    prolesPos.push(
      {
        id:c++,
        x:j,
        y:i,
        type:0,
        color: 'dark'
});



function rotateBoard(rawuserPos){
  var userPos = JSON.parse(JSON.stringify(rawuserPos));
  for(let i=0;i<userPos.length;i++)
  {
    userPos[i].x = 7 - userPos[i].x;
    userPos[i].y = 7 - userPos[i].y;
  }
  return userPos;
}

//add bouge players
var bougePos = [];
var c=0;
  for(let j=0;j<8;j++)
  bougePos.push(
      {
        id:c++,
        x:j,
        y:6,
        type:0
      });

      bougePos = [ ...bougePos,
  {
    id:c++,
    x:0,
    y:7,
    type:1,
  },
  {
    id:c++,
    x:1,
    y:7,
    type:2,

  },
  {
    id:c++,
    x:2,
    y:7,
    type:3,
  },
  {
    id:c++,
    x:3,
    y:7,
    type:5,
  },
  {
    id:c++,
    x:4,
    y:7,
    type:4,
  },
  {
    id:c++,
    x:5,
    y:7,
    type:3,
  },
  {
    id:c++,
    x:6,
    y:7,
    type:2,
  },
  {
    id:c++,
    x:7,
    y:7,
    type:1,
  },
]

var userPos = bougePos;
var enemyPos = prolesPos;

// enemyPos = rotateBoard(enemyPos);


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
    nextmove: [],
    color: this.props.color,
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
    if(this.props.disabled)
      return;
    
    EventRegister.emit('clearpos');
    var validmoves = this._getValidMoves(this.state.left,this.state.top);
    var moves = validmoves.map((cood) => <Pospos onPress={this._Move} key={validmoves.indexOf(cood)} top={cood.y} left={cood.x}></Pospos>);
    this.setState({nextmove: moves});

    // console.log(this.state.color);
  }

  _getValidMoves(left,top)
  {
    var move =[{x: left, y:top-1},{x: left, y:top-2}]
      var validmoves=[];
      for(let i=0;i<move.length;i++)
      {
        var indx = (userPos.findIndex( (piece) => {return ((piece.x==move[i].x)&&(piece.y==move[i].y))}));
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
    var indx = rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==nx)&&(piece.y==ny))});
    if(indx >= 0)
    {
      console.log({...enemyPos[indx]});
      enemyPos[indx] = {};
    }
    userPos[this.props.id].x = nx;
    userPos[this.props.id].y = ny;
    // userPos= rotateBoard(userPos);
    // EventRegister.emit('movemade');
    database.ref('users/' + userID).set({
      position: userPos
    });
    EventRegister.emit('clearpos');
  }  

  render()
  {
    return (
      <View>
      <TouchableWithoutFeedback onPress={this._onShowMoves}>
      <ImageBackground source={this.state.img} style={{
        margin: 0,
        padding: 0,
        width: tsize,
        height: tsize,
        position: "absolute",
        left: this.state.left*tsize,
        top: this.state.top*tsize
      }}>
        <Text>
          {/* {this.state.left + "," + this.state.top+"\n"+this.props.id} */}
        </Text>
      </ImageBackground>
      </TouchableWithoutFeedback>
      {this.state.nextmove}
      </View>
    );

  }
}

class Pawn extends Piece {
  constructor(props){
    super(props);
    this.state.img =imgpawn;
    if(this.state.color == 'dark')
      this.state.img = imgpawndark;
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];
    for(let i=1;i<3;i++)
    {
      var saysaysay = {x:left, y:top-i};
      if((userPos.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        break;
      else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
        break;
      else
        validmoves.push(saysaysay);
    }
    var saysaysay = {x:left-1, y:top-1};
    if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        validmoves.push(saysaysay);
    var saysaysay = {x:left+1, y:top-1};
    if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
        validmoves.push(saysaysay);
    return validmoves;
  }

}

class Rook extends Piece {
  constructor(props){
    super(props);
    this.state.img =imgrook;
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];

    //going up
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top};
      if(!checkmove(saysaysay,validmoves))
        break;
    }

    //going right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    return validmoves;
  }
}

class Bishop extends Piece {
  constructor(props){
    super(props);
    this.state.img =imgbishop;
  }

  _getValidMoves(left,top)
  {
    var validmoves=[];

    //going up-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going up-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    return validmoves;
  }
}

function wouldCheckMate(x,y){
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x-1)&&(piece.y==y-1))})) >= 0)
    return true;
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x+1)&&(piece.y==y-1))})) >= 0)
    return true;
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x+1)&&(piece.y==y+1))})) >= 0)
    return true;
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x-1)&&(piece.y==y+1))})) >= 0)
    return true;
  return false;
}

function checkmove(say,vmoves)
{
  if((userPos.findIndex( (piece) => {return ((piece.x==say.x)&&(piece.y==say.y))})) >= 0)
    return false;
  else if(say.x >7 || say.x <0 || say.y>7 || say.y<0)
    return false;
  else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==say.x)&&(piece.y==say.y))})) >= 0)
    {
      vmoves.push(say);
      return false;
    }
  vmoves.push(say);
  return true;
}

class Queen extends Piece {
  constructor(props){
    super(props);
    this.state.img =imgqueen;
  }

  _getValidMoves(left,top)
  {

    var validmoves=[];

    //going up
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going up-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down-left
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left-i, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going down-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top+i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    //going up-right
    for(let i=1;i<8;i++)
    {
      var saysaysay = {x:left+i, y:top-i};
      if(!checkmove(saysaysay,validmoves))
          break;
    }

    return validmoves;
  }

  
}

class Knight extends Piece {
  constructor(props){
    super(props);
    this.state.img =imgknight;
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
        if((userPos.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
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
    this.state.img =imgking;
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
        if((userPos.findIndex( (piece) => {return ((piece.x==saysaysay.x)&&(piece.y==saysaysay.y))})) >= 0)
          {}
        else if(saysaysay.x >7 || saysaysay.x <0 || saysaysay.y>7 || saysaysay.y<0)
          {}
        else if(wouldCheckMate(saysaysay.x,saysaysay.y))
          {}
        else
          validmoves.push(saysaysay);
      }
    }


    return validmoves;
  }

}

// console.log((new King())._getValidMoves(0,0));

class Chessboard extends Component {
  
  state = {
    piecedeets : userPos,
    enemydeets : rotateBoard(enemyPos)
  }

  constructor(props)
  {
    super(props);
  }

  componentDidMount() {
    this.listener = EventRegister.addEventListener('movemade', (data) => {
      this.setState({
        piecedeets : data.a,
        enemydeets : rotateBoard(data.b)
      });
    });
    console.log(userID);
    database.ref('users/' + user.uid).on('value', function(snapshot) {
        // alert("haha");
        // if(snapshot.val())
        // console.log(snapshot.val().position);
        userPos = snapshot.val().position;
        EventRegister.emit('movemade', {a: userPos, b: enemyPos});
      });
  }

  componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
  }

  render()
  {
    var pisces = this.state.piecedeets.map( (item) => {
      switch (item.type) {
        case 0:
          return <Pawn key={item.id} color={item.color} id={item.id} left={item.x} top={item.y}></Pawn>
        case 1:
          return <Rook key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Rook>
        case 2:
          return <Knight key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Knight>
        case 3:
          return <Bishop key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Bishop>
        case 4:
          return <Queen key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Queen>
        case 5:
          return <King key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></King>
      }
    });

    var enemypisces = this.state.enemydeets.map( (item) => {
      switch (item.type) {
        case 0:
          return <Pawn disabled={true} key={item.id} color={item.color} id={item.id} left={item.x} top={item.y}></Pawn>
        case 1:
          return <Rook disabled={true} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Rook>
        case 2:
          return <Knight disabled={true} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Knight>
        case 3:
          return <Bishop disabled={true} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Bishop>
        case 4:
          return <Queen disabled={true} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Queen>
        case 5:
          return <King disabled={true} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></King>
      }
    });
    return (
      
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      }}>
      
      <ImageBackground source={image} style={styles.image}>
      {pisces}
      {enemypisces}
      </ImageBackground>
    </View>
    );
  }
}

f.auth().onAuthStateChanged(function(ussr) {
  if (ussr) {
    user = ussr;
    userID = user.uid;
    // alert(user.uid);  
  } else {
    // No user is signed in.
  }
});

class ChessScreen extends Component {
  constructor(props)
  {
    super(props);
  }

  componentDidMount()
  {
    
  }

  render()
  {
    // if(this.state.ready)
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
    // else
    // return <AppLoading></AppLoading>;
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