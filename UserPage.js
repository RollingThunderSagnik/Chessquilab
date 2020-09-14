import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, BackHandler, Alert, _View, TouchableOpacity } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserHeader from './UserHeader';
import GameRequestCard from './GameRequestCard';
import {f, auth, database} from './config/config';
import Icon from 'react-native-vector-icons/FontAwesome';

import Feather from 'react-native-vector-icons/Feather';

const ActivityTab = () => {
    return (
        <View style={{backgroundColor: '#181818', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    )
};

const GameRequestsTab = () => {
    return (
        <View style={{backgroundColor: '#181818', flex: 1, alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{paddingBottom: 22, marginTop: -16}}>
                {/*Game Requests Cards to be Mapped according to API Calls*/}
                <GameRequestCard event='Indian Independence' from='@Hentai' />
                <GameRequestCard event='Nandigram' from='@yoko' />
                <GameRequestCard event='Naxalbari' from='@random' />
            </ScrollView>
        </View>
    )
};

class Player extends Component {
    state = {
       id : this.props.id,
       name : this.props.name,
       online : this.props.online
    }
  
    constructor(props)
    {
      super(props);
    }

    componentDidUpdate(prevProps) {
        if (this.props.online !== prevProps.online) {
            this.setState({ 
              online : this.props.online,
              }
            );
          }
    }

    render()
    {
        return(
        <View style={{backgroundColor: '#181818', padding: 20, paddingBottom: 0}}>
            {/* <ion-icon name="ellipse-outline"></ion-icon> */}

            <View style={{height: 50, backgroundColor: '#181818', flexDirection:"row", alignItems: 'center'}}>
                <Icon name="circle" stroke-width={3} size={15} color={this.state.online?"green":"grey"} />
                <Text style={{ marginHorizontal: 10, color: 'white', fontFamily: 'Carme', fontSize: 18}}>{this.state.name}</Text>
                <TouchableOpacity onPress={this.props.onchess} style={{position: 'absolute', right: 0}} >
                    <Feather name="send" stroke-width={3} size={20} color="white" />
                </TouchableOpacity>
            </View>
            
        </View>
        );
    }
}

class ActivePlayersTab extends Component {
  
    state = {
        activeUsers : []
    }
  
    constructor(props)
    {
      super(props);
    }

    componentDidMount()
    {
        database.ref('users').on('value', (snapshot) => {
        // alert("haha");
        let onliners = [];
            var users = snapshot.val();
            for( var user in users)
            {
                if(auth.currentUser){
                    if(user != auth.currentUser.uid)
                        onliners.push({id: user, ...users[user]});
                    // console.log({id: user, ...users[user]});
                }
            }
            this.setState({
                activeUsers : onliners
            });
        });
        
    }

    render()
    {
        var ussrs = this.state.activeUsers.map((user) => {
                return <Player onchess={this.props.onchess} key={user.id} id={user.id} name={user.name} online={user.online}></Player>
            });
        return (
            <View style={{backgroundColor: '#181818', flex: 1}}>
                {ussrs}
            </View>
        )

    }
}


export default function UserPage(props) {

    const handleBackButton = () => {
        Alert.alert(
            'Exit Chessquilab ?',
            '', [{
                text: 'Cancel',
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => BackHandler.exitApp()
            }],
            {
                cancelable: false
            }
        );
        return true;
    }

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        })

        props.navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        })
    });

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    const signOutUser = () => {
        database.ref('users/' + auth.currentUser.uid + '/').update({'online': false})
        auth.signOut()
            .then(() => {console.log('Logged Out...')})
            .catch((error) => {
                console.log('Error: ', error);
            });
    
        props.navigation.navigate('Doorway');
    }

    const chaloChess = () => {
        props.navigation.navigate('Chessboard');
    }

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='#181818' barStyle="light-content" />
                <UserHeader logout={signOutUser} />
                <ScrollableTabView
                    tabBarInactiveTextColor='#aaa'
                    tabBarActiveTextColor='white'
                    renderTabBar={() => <TabBar 
                        underlineColor='white' 
                        tabBarTextStyle={{
                            fontFamily: 'Carme',
                            fontSize: 18
                        }}
                        tabBarStyle={{ 
                            backgroundColor: '#181818',
                            paddingTop: 22,
                            borderBottomWidth: 0,
                            marginTop: 0,
                            alignSelf: 'center',
                        }}
                        tabStyles={{
                            badgeBubble: {
                                cusolor: 'white',
                                paddingVertical: 8,
                                marginTop: 1,
                                borderRadius: 100
                            },
                            badgeText: {
                                color: '#181818'
                            }

                        }}
                    />}
                >
                    <GameRequestsTab tabLabel={{label: 'Game Requests', badge: '8'}} label=''/>
                    <ActivityTab tabLabel={{label: 'Sent Requests'}} label=''/>
                    <ActivePlayersTab tabLabel={{label: 'Players'}} label='' onchess={chaloChess} />
                </ScrollableTabView>
            </View>
        )
    }
};
