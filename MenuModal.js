import React, { Component } from 'react';
import { StatusBar, Text, View, Dimensions,  TouchableOpacity} from 'react-native';
import { EventRegister} from 'react-native-event-listeners';
import {f, auth, database} from './config/config';
import {prolePos, boujPos} from './freshPositions';
import {Picker} from '@react-native-community/picker';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { Select, SelectItem} from '@ui-kitten/components';

import Icon from 'react-native-vector-icons/FontAwesome';

import Feather from 'react-native-vector-icons/Feather';
// import Text as Sext from '@ui-kitten/components';
// import { Button as UIButton, Text as UIText } from '@ui-kitten/components';



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
    this.state.player1 = auth.currentUser;
    this.state.player2 = this.props.opponent || ' ';
    this.state.roleprole = 'nxl';
    this.state.styles = {
      text : {color: '#fff', fontFamily: 'Carme', fontSize: 18}
    }
  }

  componentDidMount()
  {
    
  }

  render()
  {
    // if(this.state.ready)
    var radio_props = [
      {label: this.state.player1.displayName, value: this.state.player1.uid },
      {label: this.state.player2.name, value: this.state.player2.uid }
    ];
    
    return (
     <>
      
        {/* modal */}
          <View 
          style={{
            // alignSelf: 'center',
            // position: 'absolute',
            width: sWidth/1.5,
            // height: sHeight/3,
            borderRadius: 8,
            backgroundColor: '#333',
            paddingBottom: 10
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
                    <Text style={this.state.styles.text}>SEND GAME REQUEST</Text>
                    <TouchableOpacity style={{position:'absolute',right:0}} onPress={()=>{this.setState({visible:false})}}>
                    <Feather style={{padding:10}} size={18} color='white' name='x'></Feather>
                    </TouchableOpacity>
                </View>

                <View 
                style={{
                  marginHorizontal: 20,
                  // alignSelf:'center',
                  paddingBottom:10,
                  }}>
                    {/* <Icon name='circle' color='#a20' size={15}></Icon> */}
                <Text style={{...this.state.styles.text, fontSize:13}}>CHOOSE PROLE</Text>
                </View>


                  
                <RadioForm radio_props={radio_props} initial={0}
                    style={{
                      marginHorizontal: 20,
                      // alignSelf:'center'
                      }}
                    formHorizontal={false}
                    buttonSize={10}
                    buttonOuterSize={15}
                    formHorizontal={true}
                    selectedButtonColor='#fff'
                    buttonColor='#aaa'
                    selectedLabelColor='#fff'
                    labelColor='#aaa'
                    labelStyle={{
                      fontSize: 15,
                      marginRight: 10}}
                      onPress={(value) => {this.setState({roleprole:value})}}    
                />    
               <TouchableOpacity style={{alignSelf:'center'}}
                    onPress={()=>{}}
                >
                  <View style={{
                        borderColor: 'white',
                        borderWidth: 1,
                        paddingHorizontal: 40,
                        padding: 8,
                        margin: 10,
                        borderRadius: 20,
                        // marginTop: 40
                    }}>
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Carme'
                        }}
                    >
                        challenge!
                    </Text>
                    </View>
                </TouchableOpacity>
          </View>
      </>);   
}
}

export default MenuModal;