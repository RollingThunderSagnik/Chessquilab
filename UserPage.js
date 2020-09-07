import React, { Component } from 'react';
import { View, Text, StatusBar, ScrollView } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserHeader from './UserHeader';
import GameRequestCard from './GameRequestCard';
import {f, auth, database} from './config/config';

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
                if(users[user].online)
                {
                    onliners.push(user);
                }
            }
        });
        this.setState({
            activeUsers : onliners
        });
    }

    render()
    {
        var ussrs = this.state.activeUsers.map( (id) => {return <Text>{id}</Text>});
        return (
            <View style={{backgroundColor: '#333', flex: 1, alignItems: 'center'}}>
            {ussrs}
            {/* <Text>{auth.currentUser.displayName}</Text> */}
            </View>
        )

    }
}


export default function UserPage(props) {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    const signOutUser = () => {
        auth.signOut()
            .then(() => {
                console.log('Logged Out...');
            }).catch((error) => {
                console.log('Error: ', error);
            });
    
        props.navigation.navigate('Doorway')
    }

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='black' barStyle="light-content" />
                <UserHeader logout={signOutUser}/>
                <ScrollableTabView
                    tabBarInactiveTextColor='white'
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
                    <ActivityTab tabLabel={{label: 'Activities'}} label=''/>
                    <ActivePlayersTab tabLabel={{label: 'Active Players'}} label=''/>
                </ScrollableTabView>
            </View>
        )
    }
};
