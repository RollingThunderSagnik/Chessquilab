import React, { Component } from 'react';
import { Text, View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import Pospos from './Pospos';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
const tsize = chsize/8;


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

  export default Piece;