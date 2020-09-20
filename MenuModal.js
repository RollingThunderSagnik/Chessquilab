import React, { Component } from 'react';
import { StatusBar, Text, View, Dimensions,  TouchableOpacity} from 'react-native';
import {f, auth, database} from './config/config';
import RadioButtonRN from 'radio-buttons-react-native';
import {Picker} from '@react-native-community/picker';
import SmoothPicker from "react-native-smooth-picker";


const sWidth = Dimensions.get('window').width;
const sHeight = Dimensions.get('window').height;

class MenuModal extends Component {
  state = {
      player1: 'a',
      player2: 'b',
      scenario: 0
  }

  handleChange = async(index) => {
    await this.setState({
      scenario: index
    });
    console.log(this.state.scenario,this.state.roleprole);
    
  };

  constructor(props)
  {
    super(props);
    this.state.player1 = auth.currentUser;
    this.state.player2 = this.props.opponent || ' ';
    this.state.roleprole = 'nxl';
    this.state.styles = {
      text : {color: '#000', fontFamily: 'TTNorms-Medium', fontSize: 18}
    }
    this.state.language= 0;
    this._sendRequest = this._sendRequest.bind(this);
  }

  componentDidMount()
  {
    
  }

  _sendRequest()
  {
    var x = database.ref('gameRequests').push().key;
    console.log(x);
    // alert("hello");
    var updates = {};
    updates['/gameRequests/' + x] = {
      from: this.state.player1.uid,
      to: this.state.player2.uid,
      context: this.state.scenario,
      prole : this.state.roleprole
    };

    database.ref().update(updates);
    this.props.onPress();
  }

  render()
  {
    const radio_props = [
      {label: this.state.player1.displayName, value: this.state.player1.uid },
      {label: this.state.player2.name, value: this.state.player2.uid }
    ];
    const select_props = [
      {value: 0, label: 'Black Lives Matter'},
      {value: 1, label: 'Nandigram'},
      {value: 2, label: 'Naxalbari'},
      {value: 3, label: 'October Revolution'}
    ];
    const { scenario } = this.state;


    return (
     <>
      
        {/* modal */}
        <View style={{}}>
               {/* title */}
                <View 
                style={{ 
                height: 30,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                paddingHorizontal:22
                }}>
                    <Text style={this.state.styles.text}>SEND GAME REQUEST</Text>
                </View>

                <View>
                <Text style={{...this.state.styles.text, fontSize:13}}>CHOOSE SCENARIO</Text>
                </View>
                <SmoothPicker
                  style={{
                    alignSelf:'center'
                  }}
                  offsetSelection={0}
                  magnet
                  width={sWidth/2}
                  scrollAnimation
                  horizontal={true}
                  // selectOnPress={true}
                  // snapInterval={200}
                  data={select_props}
                  keyExtractor={(item) => item.value}
                  onSelected={({ item, index }) => this.handleChange(index)}
                  renderItem={({ item, index }) => (
                    <View style={{
                      borderColor: index === scenario ? '#000':'#999',
                      borderWidth: 1,
                      backgroundColor: index === scenario ? '#222':'#fff',
                      // width:100,
                      padding:12,
                      paddingHorizontal:20,
                      alignItems:'center',
                      borderRadius:2,
                      margin: 10,
                  }}>
                    <Text style={{
                      color:  index === scenario ? '#fff':'#777',
                  }}>{item.label}</Text>
                    </View>
                  )}
                />
                

                <View style={{
                marginTop: 15}}>
                <Text style={{...this.state.styles.text, fontSize:13}}>
                  CHOOSE REVOLUTIONARIES
                </Text>
                </View>
                 <RadioButtonRN
                    data={radio_props}
                    selectedBtn={(e) => this.setState({roleprole : e.value})}
                    initial={1}
                    circleSize={10}
                    boxStyle={{padding:0}}
                    textStyle={{paddingLeft:10}}
                    activeColor='#ff4971'
                    boxActiveBgColor='#ff497155'
                  /> 


               <TouchableOpacity 
                    style={{
                      alignSelf:'center',
                      marginTop: 8,
                      marginBottom: 5
                    }}
                    onPress={this._sendRequest}
                >
                  <View style={{
                        borderColor: '#000',
                        borderWidth: 1,
                        paddingHorizontal: 40,
                        padding: 8,
                        margin: 10,
                        borderRadius: 20,
                    }}>
                    <Text
                        style={{
                            color: '#000',
                            fontFamily: 'TTNorms-Bold'
                        }}
                    >
                        CHALLENGE!
                    </Text>
                    </View>
                </TouchableOpacity> 
          </View>
      </>);   
}
}

export default MenuModal;