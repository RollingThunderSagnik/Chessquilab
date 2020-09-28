import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';
import { useNavigation } from '@react-navigation/native';

import {prolePos, boujPos} from './freshPositions';
const userPos = boujPos;
const enemyPos = prolePos;

const { width, height } = Dimensions.get('screen');






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
        // this.state.navigation = this.props.navigation;
    }
    
    componentDidMount()
    {
        database.ref('users/' + this.props.from).once('value').then( (snapshot) => {
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
        database.ref('gameRequests/'+this.state.id).remove()
        .then(() => {
            // console.log(this.state.id);
        });
        database.ref('users/' + this.props.prole).update({
            position : prolePos,
            playing : true,
            turn: false
        });
        var bouj = (this.props.prole == this.props.to)?this.props.from:this.props.to;
        database.ref('users/' + bouj).update({
            position : boujPos,
            playing : true,
            turn: true
        });
        database.ref('users/' + this.props.from).update({
            opponent : this.props.to
        });
        database.ref('users/' + this.props.to).update({
            opponent : this.props.from
        });

        database.ref('users/' + this.props.to + '/matches').once('value')
        .then((snapshot)=> {
            if(snapshot)
                database.ref('users/' + this.props.to + '/matches').set((snapshot.val() + 1));
        });

        database.ref('users/' + this.props.from + '/matches').once('value')
        .then((snapshot)=> {
            if(snapshot)
                database.ref('users/' + this.props.from + '/matches').set((snapshot.val() + 1));
        });
        // this.props.navigation.navigate('Chessboard');
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
// export default ReceivedGameCard;
export default function(props) {
    const navigation = useNavigation();
  
    return <ReceivedGameCard {...props} navigation={navigation} />;
}


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