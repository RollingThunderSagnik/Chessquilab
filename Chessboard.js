import React, { Component, useEffect } from 'react';
import { StatusBar, Alert, StyleSheet, Text, View, BackHandler, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';
import { EventRegister} from 'react-native-event-listeners';
import {f, auth, database} from './config/config';
import { AppLoading } from 'expo';    
import Icon from 'react-native-vector-icons/FontAwesome5';
import { LinearGradient } from 'react-native-svg';
import Popover from 'react-native-popover-view';
import Result from './resultMessage';


// const { sWidth, sHeight } = Dimensions.get('screen');
const sWidth = Dimensions.get('window').width;
const sHeight = Dimensions.get('window').height;
const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const image = require('./assets/chess.png');
const imgpawn = require('./assets/pawn.png');
const imgpawndark = require('./assets/pawn_dark.png');
const imgrook = require('./assets/rook.png');
const imgbishop = require('./assets/bishop.png');
const imgknight = require('./assets/knight.png');
const imgqueen = require('./assets/queen.png');
const imgking = require('./assets/king.png');

const tsize = chsize/8;

let myout, enemyout, checker, boolKing;
let checkList = [], checkRescue = [];

// let dbGameRequests = database.ref('gameRequests');
let dbAllUsers = database.ref('users');
let dbcurrentUser, dbOppUser;
if(auth.currentUser) 
    dbcurrentUser = dbAllUsers.child(auth.currentUser.uid);

function rotateBoard(rawuserPos){
  var uPos = JSON.parse(JSON.stringify(rawuserPos));
  for(let i=0;i<uPos.length;i++)
  {
    if(uPos[i])
    {
    uPos[i].x = 7 - uPos[i].x;
    if(uPos[i].y != -1)
      uPos[i].y = 7 - uPos[i].y;
    }
  }
  return uPos;
}

var userPos = [];
var enemyPos = [];



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
    this.listener = EventRegister.addEventListener('checkChe', () => {
      if(this.props.color != 'dark')
      {
      let validmoves = this._getValidMoves(this.state.left,this.state.top);
      if(validmoves.length != 0)
        checkRescue.push(this.props.id);
      checkList.push(('id' + this.props.id));
      }
    });
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
  }

  _getValidMoves(left,top)
  {
    // var move =[{x: left, y:top-1},{x: left, y:top-2}]
    //   var validmoves=[];
    //   for(let i=0;i<move.length;i++)
    //   {
    //     var indx = (userPos.findIndex( (piece) => {return ((piece.x==move[i].x)&&(piece.y==move[i].y))}));
    //     if(indx == -1)
    //       validmoves.push(move[i]);
    //   }

    return [1,2,3,4,5];
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
      enemyPos[indx].y = -1
      enemyPos[indx].x = 7
    }
    userPos[this.props.id].x = nx;
    userPos[this.props.id].y = ny;
    // EventRegister.emit('movemade');
    if(dbcurrentUser)
    {
        dbcurrentUser.update({
          position: userPos,
          turn : false,
        });
    }
    
    // let haha = rotateBoard(enemyPos);
    if(dbOppUser)
    {
      dbOppUser.update({
        position: enemyPos,
        turn : true
      });
    }
    
    EventRegister.emit('clearpos');
  }  

  render()
  {
    if(this.state.top != -1)
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

    return(
      <View style={{width:17,justifyContent: 'center',alignItems:'center'}}>
      <TouchableWithoutFeedback onPress={this._onShowMoves}>
      <ImageBackground source={this.state.img} style={{
        margin: 0,
        paddingHorizontal: 0,
        width: 20,
        height: 20,
      }}>
        <Text>
          {/* {this.state.left + "," + this.state.top+"\n"+this.props.id} */}
        </Text>
      </ImageBackground>
      </TouchableWithoutFeedback>
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

    let cutoff=0;
    if(boolKing)
    {
      if(checkKheyeche())
      {
        if(checker.y != top-1)
          return validmoves;
        if(Math.abs(checker.x-left) != 1)
          return validmoves;
        validmoves=[{x:checker.x,y:checker.y}]
        return validmoves;
      }
      if(top>5)
        cutoff=1;
    }
    else
    {
    if(top>=5)
     cutoff=1;
    }

    //clear check


    //default scenario

    for(let i=1;i<(2+cutoff);i++)
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
    //if king in check
    if(checkKheyeche())
    {
      let sgnx = checker.x-left;
      let sgny = checker.y-top;
      if(sgnx!=0 && sgny!=0)
        return validmoves;
      sgnx = Math.sign(sgnx);
      sgny = Math.sign(sgny);

      
      for(let i=left+sgnx,j=top+sgny;i!=(checker.x) || j!=(checker.y);i+=sgnx, j+=sgny)
      {
        // validmoves.push({x:i,y:j});
        if((userPos.findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
          return validmoves;
        else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
          return validmoves;  
      }

      validmoves.push({x:checker.x,y:checker.y});
      return validmoves;
    }

    //normal
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
    
    //if king in check
    if(checkKheyeche())
    {
      let sgnx = checker.x-left;
      let sgny = checker.y-top;
      if(Math.abs(sgnx/sgny)!=1)
        return validmoves;
      sgnx = Math.sign(sgnx);
      sgny = Math.sign(sgny);

      for(let i=left+sgnx,j=top+sgny;i!=(checker.x) && j!=(checker.y);i+=sgnx, j+=sgny)
      {
        // validmoves.push({x:i,y:j});
        if((userPos.findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
          return validmoves;
        else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
          return validmoves;  
      }
      
      validmoves = [{x:checker.x,y:checker.y}]
      return validmoves;
    }

    //normal scenario
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


//returns false if no check, returns position of checker if king in check
function checkKheyeche()
{
  let king ={};
  for(let i in userPos)
  {
    let item = userPos[i];
    if(item.type==5)
    {
      king.y= item.y;
      king.x= item.x;
    }
  } 
  // return false;
  // return ;
  if(!wouldCheckMate(king.x,king.y))
  {
    return false;
  }
  checker = (rotateBoard(enemyPos).find( (piece) => {return ((piece.x==(king.x+1))&&(piece.y==(king.y-1)))}))
  if(!checker)
    checker = (rotateBoard(enemyPos).find( (piece) => {return ((piece.x==(king.x-1))&&(piece.y==(king.y-1)))}))
  
  return checker;
}

//returns false if safe position
function wouldCheckMate(x,y){
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x-1)&&(piece.y==y-1))})) >= 0)
    return true;
  if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x+1)&&(piece.y==y-1))})) >= 0)
    return true;
  // if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x+1)&&(piece.y==y+1))})) >= 0)
  //   return true;
  // if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==x-1)&&(piece.y==y+1))})) >= 0)
  //   return true;
  return false;
}


function hasKing()
{
  for(let i in userPos)
  {
    let item = userPos[i];
    if(item.type!=0)
      return true;
  } 
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

        //if king in check
        if(checkKheyeche())
        {
          let sgnx = checker.x-left;
          let sgny = checker.y-top;
          let flag=true;
          if(sgnx==0 || sgny==0)
          {
            sgnx = Math.sign(sgnx);
            sgny = Math.sign(sgny);
    
            
            for(let i=left+sgnx,j=top+sgny;i!=(checker.x) || j!=(checker.y);i+=sgnx, j+=sgny)
            {
              // validmoves.push({x:i,y:j});
              if((userPos.findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
                flag=false;
              else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
                flag=false;
            }
          }
          else if(Math.abs(sgnx/sgny)==1)
          {
            sgnx = Math.sign(sgnx);
            sgny = Math.sign(sgny);
    
            for(let i=left+sgnx,j=top+sgny;i!=(checker.x) && j!=(checker.y);i+=sgnx, j+=sgny)
            {
              // validmoves.push({x:i,y:j});
              if((userPos.findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
                flag=false;
              else if((rotateBoard(enemyPos).findIndex( (piece) => {return ((piece.x==i)&&(piece.y==j))})) >= 0)
                flag=false;
            }
          }
          else
            flag=false;
          
          if(flag)
            validmoves.push({x:checker.x,y:checker.y});
          return validmoves;
        }

    //normal
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
    if(checkKheyeche())
    {    
      var kiws = [1,-1];

      for(let i=1;i<3;i++)
      {
        for(let j=0;j<2;j++)
        {
          for(let k=0;k<2;k++)
          {
          var saysaysay = {x:left+kiws[k]*kiws[j]*(3-i), y:top+kiws[j]*i};
          if(saysaysay.x == checker.x && saysaysay.y == checker.y)
            validmoves.push(saysaysay);
          }
        }
      }
      return validmoves;
      
    }

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

  _onShowMoves(){
    if(this.props.disabled)
      return;
    
    EventRegister.emit('clearpos');
    var validmoves = this._getValidMoves(this.state.left,this.state.top);
    var moves = validmoves.map((cood) => <Pospos onPress={this._Move} key={validmoves.indexOf(cood)} top={cood.y} left={cood.x}></Pospos>);
    this.setState({nextmove: moves});
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



class Chessboard extends Component {
  
  state = {
    piecedeets : userPos,
    enemydeets : rotateBoard(enemyPos),
    turn: false,
    winner: false,
  }

  constructor(props)
  {

    super(props);
    let user = auth.currentUser;
    f.auth().onAuthStateChanged(function(ussr) {
      if (ussr) {
        user = ussr;
        // userID = user.uid;
        dbcurrentUser = dbAllUsers.child(user.uid);
      } 
      else {
      }
    });

    this._gameLost = this._gameLost.bind(this);      
  }

  componentDidMount()
  {
    let user = auth.currentUser;
    this.setState({
      name : user.displayName.toUpperCase()
    });
    dbcurrentUser = dbAllUsers.child(user.uid);
    if(dbcurrentUser)
    {
    dbcurrentUser.once('value')
    .then((snapshot)=> {
      if(snapshot.val())
      {
        let oppID = snapshot.val().opponent;
        dbOppUser = dbAllUsers.child(oppID);
      }
    }).then( 
      () => {
        if(dbOppUser)
        {
          dbOppUser.child('name').once('value')
          .then((snapshot)=>{
            let oppName = snapshot.val();
            this.setState({
              oppName: oppName.toUpperCase() 
            });
          });
          dbOppUser.child('position').on('value', (snapshot)=> {
            if(snapshot.val())
            {
              enemyPos = snapshot.val();
              this.setState({
                enemydeets : rotateBoard(enemyPos)
              });
            }
          });
        }
        dbcurrentUser.child('position').on('value', (snapshot)=> {
          if(snapshot.val())
          {
            userPos = snapshot.val();
            this.setState({
              piecedeets : userPos
            });
          }
        });

        dbcurrentUser.child('winner').on('value', (snapshot)=> {
          if(snapshot.val())
          {
            this.setState({
              matchEnd: true,
              winner: true
            });
          }
        });

        boolKing = hasKing();
        
        dbcurrentUser.child('turn').on('value', (snapshot)=> {
          let turnornot = snapshot.val();
          if(turnornot)
            this._checkLost();
          this.setState({
            turn : turnornot
          });
        });
      
      });  
      
    }
  }

  _checkPawn()
  {
  let haha = myout.length;
  let hahu = userPos.length;  
  if(haha==hahu)
    return true;
  return false;
  }

  _checkLost()
  {
    let hahu = userPos.length;
    if(hahu==0)
      return;

    let lost;

    if(boolKing)
    {
      checkList = [];
      checkRescue = [];
      EventRegister.emit('checkChe');
      lost = (checkRescue.length==0);
    }
    else
    {
      lost = this._checkPawn();
    }

    if(lost)
    {
      this.setState({
        matchEnd: true
      });
      if(dbOppUser)
      {
        dbOppUser.child('won').once('value')
        .then((snapshot)=> {
            if(snapshot.val())
              dbOppUser.child('won').set((snapshot.val() + 1));
      });
      dbOppUser.child('winner').set(true);
      }
    }

  }

  _gameLost()
  {
    if(dbcurrentUser)
    {
      dbcurrentUser.update({
        playing: false,
        winner : false
      });
      this.setState({
        matchEnd: false
      });
      this.props.exitapp();
    }
    
  }

  _getPawns (item,disabld)
  {
    switch (item.type) {
      case 0:
        return <Pawn disabled={disabld} key={item.id} color={item.color} id={item.id} left={item.x} top={item.y}></Pawn>
      case 1:
        return <Rook disabled={disabld} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Rook>
      case 2:
        return <Knight disabled={disabld} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Knight>
      case 3:
        return <Bishop disabled={disabld} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Bishop>
      case 4:
        return <Queen disabled={disabld} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></Queen>
      case 5:
        return <King disabled={disabld} key={item.id} color={item.color}  id={item.id} left={item.x} top={item.y}></King>
    }
  }

  render()
  {
    var veil =<View style={{
        position: 'absolute',
        width: chsize,
        backgroundColor: 'rgba(0,0,0,0.3)',
        height: chsize,
        alignItems: 'center',
        justifyContent: 'center'
        }}>
          <Icon name='hourglass-half' size={60} color='white' ></Icon>
      </View>
    

    if(this.state.piecedeets == null || this.state.enemydeets == null)
      return <View></View>

    var pisces = this.state.piecedeets.map( (item) => {
      if (item.y ==-1)
        return;
        return this._getPawns(item,false);
    });

    var enemypisces = this.state.enemydeets.map( (item) => {
      if (item.y ==-1)
        return;
      return this._getPawns(item,true);
    });

    enemyout = [];
    for(let i in this.state.enemydeets)
    {
      let item = this.state.enemydeets[i];
      if(item.y==-1)
      enemyout.push(this._getPawns(item,true));
    };

    myout = [];
    for(let i in this.state.piecedeets)
    {
      let item = this.state.piecedeets[i];
      if(item.y==-1)
      myout.push(this._getPawns(item,true));
    };

    return (
    <>
    <Popover 
        placement={"center"}
        isVisible={this.state.matchEnd} 
        popoverStyle={{
            padding: 20,
            borderRadius: 22,
            backgroundColor: 'white',
        }}
        backgroundStyle={{
            backgroundColor: 'rgba(0,0,0,0.5)'
        }}
        onRequestClose={this._gameLost}
    >
        <Result result={this.state.winner}></Result>
             
    </Popover>
    <View style={styles.encon}>
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.oppName}</Text>
        {enemyout.length==0?<></>:<View style={styles.gutiout}>{enemyout}</View>}
      </View>
    </View>
    <View style={styles.mycon}>
      <View style={styles.container}>
        <Text style={styles.text}>{this.state.name}</Text>
        {myout.length==0?<></>:<View style={styles.gutiout}>{myout}</View>}
      </View>
    </View>
    <View style={{
      width: chsize,
      backgroundColor: '#09f',
      height: chsize,
      }}>
      
      <ImageBackground source={image} style={styles.image}>
      {enemypisces}
      {pisces}
      </ImageBackground>
    </View>

    {this.state.turn?<></>:veil}

    {/* {veil} */}
    </>
    );
  }
}


export default function ChessScreen(props) {

    const handleBackButton = () => {
        return true;
    }

    const chalChale = () => {
      props.navigation.goBack(); 
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        })

        props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        })
    });
    
    return (<>
      <StatusBar barStyle='light-content'/>
      <View style={{
        flex: 1,
        backgroundColor: '#181818',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Chessboard exitapp={chalChale}></Chessboard>
      </View>
      </>);
}

// export default ChessScreen;

const styles = StyleSheet.create({
  mycon : {
    position: "absolute",
    bottom: 0,
    width: sWidth,
    height: (sHeight-chsize)/2,
    justifyContent: 'center',
  },
  encon : {
    position: "absolute",
    top: 0,
    width: sWidth,
    height: (sHeight-chsize)/2,
    justifyContent: 'center',
  },
  text : {
    color: '#fff',
    fontFamily: 'TTNorms-Regular',
    fontSize: 18,
    paddingBottom: 6
  },
  container:{
    // backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 20,
  },
  gutiout : {
    flexDirection:'row',
    flexWrap: 'wrap',
  },

    image: {
      flex: 1,
      width: chsize,
      height: chsize,
    }
});