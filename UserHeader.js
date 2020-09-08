import React, {Component} from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import {f, auth, database} from './config/config';

const { width, height } = Dimensions.get('screen');



class UserHeader extends Component {
    state = {
        uid: 0,
        name: 'a'
    }

    constructor(props)
    {
        super(props);
        this.state.uid = auth.currentUser.uid;
        this.state.name = auth.currentUser.displayName;
        this.state.styles = {
            color: '#fff',
            marginVertical : 5,
            fontFamily: 'Carme',
            fontSize: 13,
            alignSelf: 'center',
        }
        this.state.matches = 10;
        this.state.wins = 10;
        this.state.losses = 10;
    }

    _signOutUser = () => {
        this.props.logout();
    }

    // componentDidMount(){

    //     database.ref('users/' + this.state.uid +'/name').on('value', (snapshot) => {
    //         this.setState({
    //             name: snapshot.val()
    //         });
    //         console.log(snapshot.val());
    //     });
    // }

    render()
    {
        return (
        <>
        <View 
            style={{
                paddingTop: 22,
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                backgroundColor: '#000',
                paddingVertical: 12,
                margin: 0
            }}
        >
            {/* https://instagram.fccu10-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/118882303_650093682314195_6731059514992743719_n.jpg?_nc_ht=instagram.fccu10-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=ReBfetCx4zoAX_Kxa8M&oh=a4bebcabee73008ea9d7a81757164a75&oe=5F7FD638 */}
            <Image source={{uri: 'https://www.pngitem.com/pimgs/m/537-5372558_flat-man-icon-png-transparent-png.png'}} 
                style={{
                    padding: 4,
                    resizeMode: 'cover', 
                    borderRadius: 50, 
                    width: 80, 
                    height: 80,
                    margin: 0
                }} 
            />

            <View 
                style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly' 
                    // backgroundColor: '#222',
                    // height: 150
                }}
            >
                <Text 
                    allowFontScaling 
                    numberOfLines={1} 
                    style={{
                        color: 'white', 
                        fontFamily: 'Carme', 
                        fontSize: 24,
                        alignSelf: 'center',
                        marginBottom: 10
                        // backgroundColor: '#444'
                    }}
                >
                    {this.state.name}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center', }}>
                        <Text style={{color: 'white', fontFamily: 'Carme', fontSize: 28}}>{this.state.wins}</Text>
                        <Text style={{color: 'white', fontFamily: 'Carme', fontSize: 14, alignSelf:'center', marginHorizontal: 12}}>{'  WINS'}</Text>
                    </View>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white', fontFamily: 'Carme', fontSize: 28}}>{this.state.losses}</Text>
                        <Text style={{color: 'white', fontFamily: 'Carme', fontSize: 14, marginHorizontal: 12}}>{'   LOSSES'}</Text>
                    </View>
                    {/* <Text style={this.state.styles}>{"Games played: " + this.state.matches}</Text> */}
                    {/* <Text style={this.state.styles}>{"Matches won: " + this.state.wins}</Text>
                    <Text style={this.state.styles}>{"Matches lost: " + this.state.losses}</Text> */}
                </View>
            </View>
        </View>
        {/* <View style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: '#000',
            paddingVertical: 12,
            margin: 0
        }}> */}
            <View style={{height: 30, backgroundColor: '#000', paddingHorizontal: 24,flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity style={{marginHorizontal: 8, marginVertical: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 8}}>Change Avatar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this._signOutUser()}  style={{marginHorizontal: 8, right: width*0.075, marginVertical: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 30}}>Log Out</Text>
                </TouchableOpacity>
            </View>
        {/* </View> */}
        </>
        )
    }
}

{/*  */}

export default UserHeader;
