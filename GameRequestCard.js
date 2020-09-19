import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import Feather from 'react-native-vector-icons/Feather';

import {f, auth, database} from './config/config';
const { width, height } = Dimensions.get('screen');

let customFonts = {
    'Helvetica': require('./assets/fonts/HelveticaNeue-Light.ttf'),
  };


class ReceivedGameCard extends Component {
    
    state = {
        fontsLoaded: false,
    };

    constructor(props)
    {
        super(props);
        this.state = {};
    }
    
    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }

    componentDidMount()
    {
        this._loadFontsAsync();
        database.ref('users/' + this.props.from).once('value').then( (snapshot) => {
            var name = snapshot.val().name;
            this.setState({
                from: name
            });
        })
        this._getContext();
    }

    _getContext()
    {
        switch(this.props.context)
            {
                case 0: 
                this.setState({ context: 'Black Lives Matter'});
                if(this.props.prole == auth.currentUser.uid)
                {   
                    this.setState({
                        role: 'ANTIFA'
                    });
                }
                else
                {   
                    this.setState({
                        role: 'White Supremacists'
                    });
                }
                break;

                case 1: 
                this.setState({ context: 'Nandigram'});
                if(this.props.prole == auth.currentUser.uid)
                {   
                    this.setState({
                        role: 'Revolutionaries'
                    });
                }
                else
                {   
                    this.setState({
                        role: 'CPM'
                    });
                }
                break;

                case 2: 
                this.setState({ context: 'Naxalbari'});
                if(this.props.prole == auth.currentUser.uid)
                {   
                    this.setState({
                        role: 'Naxals'
                    });
                }
                else
                {   
                    this.setState({
                        role: 'Congress'
                    });
                }
                break;
            }
    }

    render()
    {
        return (
        <View style={styles.box}>
            
            <View style={{flex:1,
                // backgroundColor:'#222'
                }}>
                <Text style={styles.text}>
                    {this.state.from} challenged you to play as {this.state.role} in '{this.state.context}'
                </Text>
                <View style={styles.time}>
                     <Text style={styles.timetext}>16:00, 9/11/1969</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttons}>
                    <Feather name="check" stroke-width={3} size={20} color="white" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Feather name="x" stroke-width={3} size={20} color="white" />
                </TouchableOpacity>
            </View>
        </View>);
    }
}


class SentGameCard extends ReceivedGameCard {

    componentDidMount()
    {
        this._loadFontsAsync();
        database.ref('users/' + this.props.to).once('value').then( (snapshot) => {
            var name = snapshot.val().name;
            this.setState({
                to: name
            });
        })
        this._getContext();
    }

    render()
    {
        return (
        <View style={styles.box}>
            <View style={{flex:1,
                // backgroundColor:'#222'
                }}>
                <Text style={styles.text}>
                    You challenged {this.state.to}. You will play as {this.state.role} in '{this.state.context}'
                </Text>
                <View style={styles.time}>
                     <Text style={styles.timetext}>16:00, 9/11/1969</Text>
                </View>
            </View>
            
        </View>);
    }
}

// export default SentGameCard;
export {ReceivedGameCard, SentGameCard};

const styles = StyleSheet.create({
    buttons: {
        // backgroundColor:'#000',
        width: 30,
        height: 30,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer:{
        flexDirection: 'row'
    },
    text :{
        marginLeft: 8,
        color: 'white',
        fontFamily: 'Carme',
        fontSize: 17,
    },
    time:{
        flexDirection: 'column',
        // backgroundColor: '#333',
        paddingVertical: 2
    },
    timetext :{
        marginHorizontal: 8,
        color: '#aaa',
        fontFamily: 'Carme',
        fontSize: 13
    },
    box: {
        padding:20,
        paddingBottom: 0,
        flexDirection: 'row'
    },
  });