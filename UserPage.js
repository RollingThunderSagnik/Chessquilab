import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from 'react-native-underline-tabbar';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import UserHeader from './UserHeader';

const ActivityTab = () => {
    return (
        <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    )
};

const GameRequestsTab = () => {
    return (
        <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    )
};

const ActivePlayersTab = () => {
    return (
        <View style={{backgroundColor: 'black', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Hello</Text>
        </View>
    )
};

export default function UserPage() {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View style={{flex: 1}}>
                <StatusBar backgroundColor='black' barStyle="light-content" />
                <UserHeader/>
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
