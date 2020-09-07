import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StatusBar, BackHandler, Alert } from 'react-native';
import {f, auth, database} from './config/config';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

function Doorway({navigation}) {

    f.auth().onAuthStateChanged(function(user) {
        if(user){
            navigation.navigate('Userpage')
        }
    });

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
        navigation.addListener('focus', () => {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        })

        navigation.addListener('blur', () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        })
    });

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

    return(
        <>
        <StatusBar backgroundColor='black' barStyle="light-content" />
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'black'
            }}
        >
        <TouchableOpacity
            style={{
                top: 160
            }}
            onPress={() => navigation.navigate('Chessboard')}
        >
            <Text style={{fontFamily: 'Monoton', fontSize: 28, color: 'white'}}>CHESSQUILAB</Text>
        </TouchableOpacity>
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    paddingHorizontal: 47,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => {
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButton),
                    navigation.navigate('Login')                        
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Carme',
                        color: 'white'
                    }}                   
                >
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    paddingHorizontal: 40,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => {
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButton),
                    navigation.navigate('SignUp')
                }}
            >
                <Text
                    style={{
                        fontFamily: 'Carme',
                        color: 'white'
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
        </View>
        </View>
        </>
    );
};
}

export default Doorway;