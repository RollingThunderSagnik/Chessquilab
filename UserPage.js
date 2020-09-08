import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, ScrollView, BackHandler, Alert, _View } from 'react-native';
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
        <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    )
};

const GameRequestsTab = () => {
    return (
        <View style={{backgroundColor: 'black', flex: 1, alignItems: 'center'}}>
            <ScrollView contentContainerStyle={{paddingBottom: 22, marginTop: -16}}>
                {/*Game Requests Cards to be Mapped according to API Calls*/}
                <GameRequestCard event='Indian Independence' from='@Hentai' />
                <GameRequestCard event='Nandigram' from='@yoko' />
                <GameRequestCard event='Naxalbari' from='@random' />
            </ScrollView>
        </View>
    )
};

// const ActivePlayersTab = () => {
//     return (
//         <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
//             <Text style={{color: 'white'}}>Hello</Text>
//         </View>
//     )
// };

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

    render()
    {
        return(
        <View style={{ height: 100, backgroundColor: '#000', padding: 20}}>
            {/* <ion-icon name="ellipse-outline"></ion-icon> */}

            <View style={{height: 50, backgroundColor: '#000', flexDirection:"row", alignItems: 'center'}}>
                <Icon name="circle" stroke-width={3} size={20} color="green" />
                <Text style={{ marginHorizontal: 10, color: '#fff', fontSize: 13}}>{this.state.name}</Text>
                <Feather style={{position: 'absolute', right: 0}} name="send" stroke-width={3} size={20} color="white" />
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
        let onliners = [];
        database.ref('users/').on('value', function(snapshot) {
            var users = snapshot.val();
            for( var user in users)
            {
                if(auth.currentUser)
                    if(user != auth.currentUser.uid){
                    onliners.push({id: user, ...users[user]});
                    console.log({id: user, ...users[user]});
                    }
            }
        });
        this.setState({
            activeUsers : onliners
        });
    }

    render()
    {
        var ussrs= this.state.activeUsers.map((user) => {
                return <Player key={user.id} id={user.id} name={user.name} online={user.online}></Player>
            });
        return (
            <View style={{backgroundColor: '#000', flex: 1}}>
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

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='black' barStyle="light-content" />
                <UserHeader logout={signOutUser} />
                <ScrollableTabView
                    tabBarInactiveTextColor='#aaa'
                    tabBarActiveTextColor='white'
                    renderTabBar={() => <TabBar 
                        underlineColor='white' 
                        tabBarTextStyle={{
                            fontFamily: 'Carme',
                            fontSize: 14
                        }}
                        tabBarStyle={{ 
                            backgroundColor: 'black',
                            paddingTop: 22,
                            borderBottomWidth: 0,
                            marginTop: 0                            
                        }}
                        tabStyles={{
                            badgeBubble: {
                                cusolor: 'white',
                                paddingVertical: 8,
                                marginTop: 1,
                                borderRadius: 100
                            },
                            badgeText: {
                                color: 'black'
                            }

                        }}
                    />}
                >
                    <GameRequestsTab tabLabel={{label: 'Game Requests', badge: '8'}} label=''/>
                    <ActivityTab tabLabel={{label: 'Sent Requests'}} label=''/>
                    <ActivePlayersTab tabLabel={{label: 'Players'}} label=''/>
                </ScrollableTabView>
            </View>
        )
    }
};
