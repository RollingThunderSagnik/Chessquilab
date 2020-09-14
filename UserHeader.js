import React, {Component} from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import {f, auth, database} from './config/config';
const { width, height } = Dimensions.get('screen');
import Feather from 'react-native-vector-icons/Feather';



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
        this.state.matches = 10;
        this.state.wins = 10;
        this.state.losses = 10;
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
                margin: 0
            }}
        >
            <View style={{
                flex:1,
                // backgroundColor: '#000',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
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
            </View>
           
            <View 
            style={{
                flex:2,
                paddingLeft: 10
                // backgroundColor: '#181818',
                // justifyContent: 'center',
                // alignItems: 'flex-start',
            }}>
                <View 
                style={{
                    flexDirection: 'column',
                    // alignItems: 'center',
                    // justifyContent: 'space-evenly' 
                }}
            >
                <Text 
                    allowFontScaling 
                    numberOfLines={1} 
                    style={{
                        color: 'white', 
                        fontFamily: 'Carme', 
                        fontSize: 20,
                        // alignSelf: 'flex-start',
                        marginBottom: 10,
                        // backgroundColor: '#444'
                    }}
                >
                    {this.state.name}
                </Text>
                <View style={{flexDirection: 'row',
                // justifyContent: 'space-between'
                }}>
                    <View style={this.state.styles.viu}>
                        <Text style={this.state.styles.text}>{this.state.wins}</Text>
                        <Text style={this.state.styles.label}>{'WINS'}</Text>
                    </View>
                    <View style={this.state.styles.viu}>
                        <Text style={this.state.styles.text}>{this.state.losses}</Text>
                        <Text style={this.state.styles.label}>{'LOSSES'}</Text>
                    </View>
                    <View style={this.state.styles.viu}>
                        <Text style={this.state.styles.text}>{this.state.losses}</Text>
                        <Text style={this.state.styles.label}>{'LOSSES'}</Text>
                    </View>
                </View>
            </View>
            </View>
        
        </View>
        </>
        )
    }
}

{/*  */}

export default UserHeader;
