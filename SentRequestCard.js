import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';
import { useNavigation } from '@react-navigation/native';

import {prolePos, boujPos} from './freshPositions';
const userPos = boujPos;
const enemyPos = prolePos;

const { width, height } = Dimensions.get('screen');


let dbGameRequests = database.ref('gameRequests');
let userID;
let dbUserFrom, dbUserTo;

class ReceivedGameCard extends Component {
    
    state = {
        fontsLoaded: false,
    };

    constructor(props)
    {
        super(props);
        this.state = {
            id: this.props.id
        };
        this._accept = this._accept.bind(this);

        let dbGameRequests = database.ref('gameRequests');
        let dbAllUsers = database.ref('users');
        dbUserFrom = dbAllUsers.child(this.props.from);
        dbUserTo = dbAllUsers.child(this.props.to);

        auth.onAuthStateChanged(function(user) {
            if (user) {
                userID = user.uid;
            } 
        });
        // this.state.navigation = this.props.navigation;
    }
    
    componentDidMount()
    {
        //database
        if(dbUserFrom)
            dbUserFrom.once('value').then( (snapshot) => {
                var name = snapshot.val().name;
                this.setState({
                    from: name
                });
             })
        this._getContext();
    }

    _accept()
    {

        alert(this.state.id);
        //database
        dbGameRequests.child(this.state.id).remove()
        .then(() => {
            // console.log(this.state.id);
        });
        let dbProle = (this.props.prole == this.props.to)?dbUserTo:dbUserFrom;
        if(dbProle)
        dbProle.update({
            position : prolePos,
            playing : true,
            turn: false
        });
        
        let dbBouj = (this.props.prole == this.props.to)?dbUserFrom:dbUserTo;
        if(dbBouj)
            dbBouj.update({
                position : boujPos,
                playing : true,
                turn: true
            });
        
        if(dbUserTo)
        {
            dbUserTo.update({
                opponent : this.props.from
            });
            dbUserTo.child('/matches').once('value')
            .then((snapshot)=> {
                if(snapshot)
                    dbUserTo.child('/matches').set((snapshot.val() + 1));
            });
        }

        if(dbUserFrom)
        {
            dbUserFrom.update({
                opponent : this.props.to
            });
            dbUserFrom.child('/matches').once('value')
            .then((snapshot)=> {
                if(snapshot.val())
                    dbUserFrom.child('/matches').set((snapshot.val() + 1));
            });
        }
        
        // this.props.navigation.navigate('Chessboard');
    }

    _getContext()
    {
        switch(this.props.context)
            {
                case 0: 
                this.setState({ context: 'Black Lives Matter'});
                if(this.props.prole == userID)
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
                if(this.props.prole == userID)
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
                if(this.props.prole == userID)
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
                <TouchableOpacity onPress={this._accept} style={styles.buttons}>
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
        if(dbUserTo)
            dbUserTo.once('value').then( (snapshot) => {
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


export default SentGameCard;
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