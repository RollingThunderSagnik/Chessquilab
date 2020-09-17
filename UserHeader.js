import React, {Component} from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import {f, auth, database} from './config/config';
import Feather from 'react-native-vector-icons/Feather';
import userimagepawn from './assets/userimagepawn.png';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const { width, height } = Dimensions.get('screen');

class UserHeader extends Component {
    state = {
        uid: 0,
        name: 'a'
    }

    constructor(props)
    {
        super(props);
        this.state.uid = auth.currentUser?auth.currentUser.uid:"ja";
        this.state.name = auth.currentUser?auth.currentUser.displayName:"ja";
        this.state.styles = {
            text : {
                color: 'white', 
                fontFamily: 'Carme',
                fontSize: 28
            },
            viu : {
                flexDirection: 'column',
                // backgroundColor: '#181818',
                // flex: 1,
                marginHorizontal: 2,
                alignItems: 'center',
                marginRight: 20
            },
            label : {
                color: 'white', 
                fontFamily: 'Carme',
                fontSize: 14,
                // alignSelf:'center',
                // marginHorizontal: 12
            },
        }
        this.state.matches = 40;
        this.state.wins = 20;
        this.state.losses = 20;
        this.state.witch = true;
    }

    _signOutUser = () => {
        this.props.logout();
    }

    componentDidMount(){

        f.auth().onAuthStateChanged( (user)=> {
            if (user) {
                this.setState({
                    uid : auth.currentUser.uid,
                    name : auth.currentUser.displayName,        
                });
            }
        });
        // database.ref('users/' + this.state.uid +'/name').on('value', (snapshot) => {
        //     this.setState({
        //         name: snapshot.val()
        //     });
        //     console.log(snapshot.val());
        // });
    }

    render()
    {
        var title = (<Text
        allowFontScaling 
        numberOfLines={1} 
        style={{
            color: 'white', 
            fontFamily: 'Carme', 
            fontSize: 25,
            paddingLeft: 14
            // alignSelf: 'flex-start',
            // marginBottom: 10,
            // backgroundColor: '#444'
        }}
        >CHESSQUILAB</Text>);

        var options = (
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity 
            style={{height:25, marginHorizontal: 8, borderColor: 'white', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 8}}>Change Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this._signOutUser()}  
            style={{marginHorizontal: 8, borderColor: 'white', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 30}}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
        return (
        <>
        <View style={{
            flexDirection: 'row',
            // justifyContent: 'space-around',
            // alignItems: 'center',
            backgroundColor: '#181818',
            paddingVertical: 12,
            // margin: 0
        }}>
            
            <View style={{flex: 3, }}>
                {this.state.witch?title:options}
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight:12}}>
            <TouchableOpacity onPress={() => this.setState({ witch : !this.state.witch})} style={{}} >
                    <Feather name="more-vertical" stroke-width={3} size={25} color="white" />
            </TouchableOpacity>
            </View>
        </View>
        <View 
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#181818',
                paddingVertical: 12,
                margin: 0,
                flex: 0.2
            }}
        >
            <View style={{flex: 0.33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Carme', color: 'white', fontSize: 30}}>{this.state.wins}</Text>
                <FontAwesome 
                    name='trophy' 
                    color='white' 
                    size={22}
                />
            </View>
            <View style={{flex: 0.34, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
            <Image source={userimagepawn} 
                style={{
                    padding: 4,
                    resizeMode: 'cover', 
                    borderRadius: 50, 
                    width: 80, 
                    height: 80,
                    margin: 0
                }} 
            />
            <Text numberOfLines={2} allowFontScaling adjustsFontSizeToFit style={{fontFamily: 'Carme', color: 'white', fontSize: 20}}>{this.state.name}</Text>
            </View>

            <View style={{flex: 0.33, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontFamily: 'Carme', color: 'white', fontSize: 30}}>{this.state.matches}</Text>
                <FontAwesome 
                    name='gamepad' 
                    color='white' 
                    size={22}
                />
            </View>        
        </View>
        </>
        )
    }
}

{/*  */}

export default UserHeader;
