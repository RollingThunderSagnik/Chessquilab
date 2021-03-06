import React, {Component} from 'react';
import { View, Text, Dimensions, TouchableOpacity } from 'react-native';
import {f, auth, database} from './config/config';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('screen');

let dbAllUsers = database.ref('users');
let dbcurrentUser;
if(auth.currentUser) 
    dbcurrentUser = dbAllUsers.child(auth.currentUser.uid);

let userID;

  

class UserHeader extends Component {
    state = {
        uid: 0,
        name: 'a'
    }

    constructor(props)
    {
        super(props);
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

        this.state.uid = userID
        this.state.name = auth.currentUser?auth.currentUser.displayName:"ja";
        

        f.auth().onAuthStateChanged( (user)=> {
            if (user) {
                this.setState({
                    uid : auth.currentUser.uid,
                    name : auth.currentUser.displayName,        
                });
                dbcurrentUser = dbAllUsers.child(user.uid);
            }

            dbcurrentUser.on('value',(snapshot)=> {
                if(snapshot.val()){
                    this.setState({
                        matches : snapshot.val().matches || 0,
                        wins : snapshot.val().won || 0,
                        name: snapshot.val().name,
                    });
                }
            });
        });

        // this.state.matches = 0;
        // this.state.wins = 0;
        // this.state.losses = 0;
        this.state.witch = true;

        
    }

    _signOutUser = () => {
        this.props.logout();
    }

    render()
    {
        var title = (<Text
        allowFontScaling 
        numberOfLines={1} 
        style={{
            color: 'white', 
            fontFamily: 'TTNorms-Bold', 
            fontSize: 25,
            paddingLeft: 14
            // alignSelf: 'flex-start',
            // marginBottom: 10,
            // backgroundColor: '#444'
        }}
        >CHESSQUILAB</Text>);

        // var options = (
        //     <View style={{flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 3}}>
        //         <TouchableOpacity 
        //         style={{height:25, marginHorizontal: 8, borderColor: 'white', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
        //             <Text style={{color: 'white',  fontFamily: 'TTNorms-Regular', fontSize: 13, paddingHorizontal: 8}}>Change Avatar</Text>
        //         </TouchableOpacity>
        //         <TouchableOpacity onPress={() => this._signOutUser()}  
        //         style={{marginHorizontal: 8, borderColor: 'white', borderWidth: 1, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
        //             <Text style={{color: 'white',  fontFamily: 'TTNorms-Regular', fontSize: 13, paddingHorizontal: 30}}>Log Out</Text>
        //         </TouchableOpacity>
        //     </View>
        // );

        return (
        <View style={{
            marginBottom: 20,
            position : 'relative'
        }}>

        <View style={{
            position:'absolute',
            bottom: -50,
            // top: Platform.OS === 'ios' ? Constants.statusBarHeight+80:80,
            paddingLeft: 20,
            width: width,
            height: height,
            flexDirection:'column',
            justifyContent: 'flex-end',
            // backgroundColor: '#222'
        }}>
        <Text 
            // numberOfLines={2}
            // adjustsFontSizeToFit
            // allowFontScaling
            // textBreakStrategy='simple'
            style={{
                fontFamily: 'Gilroy-ExtraBold',
                color: '#333',
                fontSize: 80
            }}>
                {this.state.name}
            </Text>
        </View>
       
       
        {/* title */}
        <View style={{
            alignItems: 'center',
            flexDirection: 'row',
            paddingVertical: 12,
        }}>
            
            <View style={{flex: 3, }}>
                {title}
            </View>
            <View style={{flex: 1, alignItems: 'flex-end', paddingRight:12}}>
                <TouchableOpacity onPress={() => this._signOutUser()} >
                    <Feather name="log-out" stroke-width={3} size={25} color="white" />
                </TouchableOpacity> 
            </View>
        </View>
        
        {/* deets */}
        <View 
            style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                // backgroundColor: '#222',
                paddingVertical: 12,
                margin: 0,
                // flex: 1
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
            {/* <Image source={userimagepawn} 
                style={{
                    padding: 4,
                    resizeMode: 'cover', 
                    borderRadius: 50, 
                    width: 80, 
                    height: 80,
                    margin: 0
                }} 
            /> */}
            <Icon name='chess-pawn' size={80} color='white' ></Icon>
            <Text 
            numberOfLines={2} 
            allowFontScaling adjustsFontSizeToFit style={{fontFamily: 'Carme', color: 'white', fontSize: 20}}>
                {}
            </Text>
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
        </View>
        )
    }
}


export default UserHeader;
