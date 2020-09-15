import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Dimensions, ImageBackground, TouchableWithoutFeedback} from 'react-native';
import { EventRegister} from 'react-native-event-listeners';
import {f, auth, database} from './config/config';
import {prolePos, boujPos} from './freshPositions';
import {Picker} from '@react-native-community/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
 
var userPos = boujPos;
var enemyPos = prolePos;

const sWidth = Dimensions.get('window').width;
const sHeight = Dimensions.get('window').height;


class MenuModal extends Component {
  state = {
      player1: 'a',
      player2: 'b'
  }
  constructor(props)
  {
    super(props);
    this.state.player1 = 'Morrissey';
    this.state.player2 = 'Bowie';
    this.state.scene = 'nxl';
  }

  componentDidMount()
  {
    
  }

  render()
  {
    // if(this.state.ready)
    var radio_props = [
      {label: 'param1', value: 0 },
      {label: 'param3', value: 1 }
    ];
    return (<>
      <StatusBar barStyle='light-content'/>
      <View style={{
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
          <View 
          style={{ 
            width: sWidth/1.5,
            height: sHeight/3,
            borderRadius: 8,
            backgroundColor: '#333'
            }}>
               {/* title */}
                <View 
                style={{ 
                height: 30,
                backgroundColor: '#444',
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                borderTopEndRadius: 8,
                borderTopStartRadius: 8,
                }}>
                    <Text style={{color: '#fff', fontFamily: 'Carme', fontSize: 18}}>Challenge {this.state.player2}</Text>
                </View>
                <View style={{marginHorizontal: 20}}>
                  <RadioForm
                    radio_props={radio_props}
                    initial={0}
                    buttonSize={10}
                    formHorizontal={true}
                    selectedButtonColor='#fff'
                    buttonColor='#fff'
                    selectedLabelColor='#fff'
                    labelColor='#fff'
                    labelWrapStyle={{marginRight: 10}}
                    buttonWrapStyle={{marginLeft: 10}}
                    onPress={(value) => {this.setState({value:value})}}
                  />
                </View>
          </View>
      </View>
      </>);
  }
}

export default MenuModal;