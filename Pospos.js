import React, { Component } from 'react';
import { View, Dimensions, TouchableWithoutFeedback} from 'react-native';
import PropTypes from 'prop-types';

const chsize = Math.floor(Math.min(Math.round(Dimensions.get('window').width), Math.round(Dimensions.get('window').width))/100)*100
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
          top: this.state.top*tsize,
          zIndex: 99
        }}> 
        </View>
        </TouchableWithoutFeedback>
      );
  
    }
  }
  
  Pospos.propTypes = { onPress: PropTypes.func.isRequired };

  export default Pospos;