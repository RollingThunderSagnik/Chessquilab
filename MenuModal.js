import React, { Component } from 'react';
import { StatusBar, Text as rText, View, Dimensions,  TouchableOpacity} from 'react-native';
import {f, auth, database} from './config/config';
import {prolePos, boujPos} from './freshPositions';
import RadioButtonRN from 'radio-buttons-react-native';
import {Picker} from '@react-native-community/picker';


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
      text : {color: '#000', fontFamily: 'Carme', fontSize: 18}
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
      context: this.state.language,
      prole : this.state.roleprole
    };

    database.ref().update(updates);
  }

  render()
  {
    var radio_props = [
      {label: this.state.player1.displayName, value: this.state.player1.uid },
      {label: this.state.player2.name, value: this.state.player2.uid }
    ];
    
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
                 <Picker
                  selectedValue={this.state.language}
                  style={{height: 50, borderWidth:1, borderColor:'#000'}}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({language: itemValue})
                  }>

                  <Picker.Item label="Black Livez Matter" value={0} />
                  <Picker.Item label="Nandigram" value={1} />
                  <Picker.Item label="Naxalbari" value={2} />
                  <Picker.Item label="October Revolution" value={3} />
                </Picker>


                <View>
                <Text style={{...this.state.styles.text, fontSize:13}}>CHOOSE PROLE</Text>
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
                      marginTop: 10
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