import React, { Component, useEffect } from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView, BackHandler, Alert, _View, TouchableOpacity, FlatList } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserHeader from './UserHeader';
import ReceivedGameCard from './GameRequestCard';
import SentGameCard from './SentRequestCard';
import {f, auth, database} from './config/config';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from "expo-constants";
import { Platform, StyleSheet } from 'react-native';
import MenuModal from './MenuModal';
import { EventRegister} from 'react-native-event-listeners';
import Popover from 'react-native-popover-view';
import Feather from 'react-native-vector-icons/Feather';


let dbGameRequests = database.ref('gameRequests');
let dbAllUsers = database.ref('users');
let dbcurrentUser;
if(auth.currentUser) 
    dbcurrentUser = dbAllUsers.child(auth.currentUser.uid);

let userID;

auth.onAuthStateChanged(function(user) {
    if (user) {
        dbcurrentUser = dbAllUsers.child(user.uid);;
        userID = user.uid;
    } else {
    }
});
  



class SentReqsTab extends Component {
    state = {
        data : [{
            event: 'hello',
            from: 'hello',
        }]
    }

    constructor(props)
    {
        super(props);
        this.state.data = [];
    }

    componentDidMount()
    {
        dbGameRequests.on('value', (snapshot) => {
            let onliners = [];
            var reqs = snapshot.val();
            for(var req in reqs)
            {
                let game = {...reqs[req],id:req};
                // console.log(game);
                if(auth.currentUser){
                    if(game.from == userID)
                        onliners.push(game);
                }
            }
            this.setState({
                data : onliners
            });
        });
    }

    render()
    {
        var receivedReqs = this.state.data.map((req) => {
            return <SentGameCard key={req.id} id={req.id} context={req.context} from={req.from} to={req.to} prole={req.prole}/>
        });
        return (
            <ScrollView style={{backgroundColor: '#181818', flex: 1}}>
                {receivedReqs}
            </ScrollView>
        )
    }
}

class RecReqsTab extends Component {
    state = {
        data : [{
            event: 'hello',
            from: 'hello',
        }]
    }

    constructor(props)
    {
        super(props);
        this.state.data = [];
    }

    componentDidMount()
    {
        dbGameRequests.on('value', (snapshot) => {
            let onliners = [];
            var reqs = snapshot.val();
            for(var req in reqs)
            {
                let game = {...reqs[req],id:req};
                // console.log(game);
                if(auth.currentUser){
                    if(game.to == userID)
                        onliners.push(game);
                }
            }
            this.setState({
                data : onliners
            });
        });
    }

    render()
    {
        var receivedReqs = this.state.data.map((req) => {
            return <ReceivedGameCard key={req.id} id={req.id} context={req.context} from={req.from} to={req.to} prole={req.prole}/>
        });
        return (
            <ScrollView style={{backgroundColor: '#181818', flex: 1}}>
                {receivedReqs}
            </ScrollView>
        )
    }
}

class Player extends Component {
    state = {
       id : this.props.id,
       name : this.props.name,
       online : this.props.online
    }
  
    constructor(props)
    {
      super(props);
      this._modal = this._modal.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.online !== prevProps.online) {
            this.setState({ 
              online : this.props.online,
              }
            );
        }
    }
    _modal()
    {
        let uid = this.state.id;
       EventRegister.emit('modDe', uid);

    }
    render()
    {
        return(
        <View style={{backgroundColor: '#181818', padding: 20, paddingBottom: 0}}>
            {/* <ion-icon name="ellipse-outline"></ion-icon> */}

            <View style={{height: 50, backgroundColor: '#181818', flexDirection:"row", alignItems: 'center'}}>
                <Icon name="circle" stroke-width={3} size={15} color={this.state.online?"green":"grey"} />
                <Text style={{ marginHorizontal: 10, color: 'white', fontFamily: 'Carme', fontSize: 18}}>{this.state.name}</Text>
                <TouchableOpacity onPress={this._modal} style={{position: 'absolute', right: 0}} >
                    <Feather name="send" stroke-width={3} size={20} color="white" />
                </TouchableOpacity>
            </View>
            
        </View>
        );
    }
}

class ShowModal extends Component {
    state = {
        visible : true
    }
    constructor(props)
    {
    super(props);
    this.state.visible = false;    
    }

    componentDidMount() {
    this.listener = EventRegister.addEventListener('modDe', (data) => {
        let oppName;
        //database
        dbAllUsers.child(data).once('value').then( (snapshot) => {
            oppName = (snapshot.val().name) || 'Anonymous';
        }).then(()=>{
            // alert(oppName);
        this.setState({
            opponent: {
                uid : data,
                name : oppName
            },
            visible : true
        });
        });        
    });
    }

    componentWillUnmount() {
    EventRegister.removeEventListener(this.listener);
    }

    render()
    {   

        const sWidth = Dimensions.get('window').width;
        const sHeight = Dimensions.get('window').height;
        // if(this.state.visible)
        // {
        return (
        // <MenuModal opponent={this.state.opponent}></MenuModal>
        <Popover 
                        placement={"center"}
                        isVisible={this.state.visible} 
                        popoverStyle={{
                            padding: 20,
                            paddingBottom: 10,
                            borderRadius: 22,
                            backgroundColor: 'white',
                        }}
                        backgroundStyle={{
                            backgroundColor: 'rgba(0,0,0,0.5)'
                        }}
                        onRequestClose={() => this.setState({visible:false})}
                    >
                        <MenuModal onPress={() => this.setState({visible:false})} opponent={this.state.opponent}></MenuModal>
                    </Popover>
        );
        // }
        // else return <></>
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
        //database
        dbAllUsers.on('value', (snapshot) => {
        //  alert("haha");
            let onliners = [];
            var users = snapshot.val();
            for( var user in users)
            {
                if(auth.currentUser){
                    if(user != userID)
                        onliners.push({id: user, ...users[user]});
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
                return <Player key={user.id} id={user.id} name={user.name} online={user.online}></Player>
            });
        return (
            <ScrollView style={{backgroundColor: '#181818', flex: 1}} contentContainerStyle={{paddingBottom: 12}}>
                {ussrs}
            </ScrollView>
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
        'Helvetica-Light': require('./assets/fonts/HelveticaNeue-Light.ttf'),
        'TTNorms-Black': require('./assets/fonts/TTNorms-Black.otf'),
        'TTNorms-Bold': require('./assets/fonts/TTNorms-Bold.otf'),
        'TTNorms-ExtraBold': require('./assets/fonts/TTNorms-ExtraBold.otf'),
        'TTNorms-Medium': require('./assets/fonts/TTNorms-Medium.otf'),
        'TTNorms-Regular': require('./assets/fonts/TTNorms-Regular.otf'),
        'Gilroy-ExtraBold': require('./assets/fonts/Gilroy-ExtraBold.otf')
    });

    //start game
    //database
    if(dbcurrentUser)
        dbcurrentUser.child('playing').on('value', (snapshot) => {
            let val = snapshot.val();
            if(val)
                props.navigation.navigate('Chessboard');
    });

    const signOutUser = () => {
        //database
        if(dbcurrentUser)
            dbcurrentUser.update({'online': false})
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
            <>
            <StatusBar backgroundColor='#181818' barStyle={ "light-content"}/>
            <ShowModal></ShowModal>
            <View style={{flex: 1, 
            backgroundColor: '#181818',
            paddingTop: Platform.OS === 'ios' ? Constants.statusBarHeight:0
            }}>
                <UserHeader logout={signOutUser} />
                <ScrollableTabView
                    style={{
                        height:40,
                        // backgroundColor:'#888',
                        // flexDirection:'row'
                    }}
                    // tabBarPosition='bottom'
                    tabBarInactiveTextColor='#aaa'
                    tabBarActiveTextColor='white'
                    renderTabBar={() => {
                    return (
                    <TabBar 
                        underlineColor='white' 
                        tabBarTextStyle={{
                            fontFamily: 'Carme',
                            fontSize: 18
                        }}
                        tabBarStyle={{ 
                            // flex:1,
                            // backgroundColor: '#fff',
                            paddingTop: 22,
                            borderBottomWidth: 0,
                            marginTop: 0,
                            alignSelf: 'center',
                        }}
                        tabStyles={{
                            badgeBubble: {
                                cusolor: 'white',
                                paddingVertical: 8,
                                marginTop: 4,
                                borderRadius: 100
                            },
                            badgeText: {
                                color: '#181818'
                            }

                        } }
                    />
                    
                    ); 
                }}
                >
                    <RecReqsTab tabLabel={{label: 'Game Requests', badge: '8'}} label=''/>
                    <SentReqsTab tabLabel={{label: 'Sent Requests'}} label=''/>
                    <ActivePlayersTab tabLabel={{label: 'Players'}} label='' />
                </ScrollableTabView>
            </View>
            </>
        )
    }
};
