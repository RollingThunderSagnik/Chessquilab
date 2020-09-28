import React, {useEffect} from 'react';
import { View, Text, TouchableOpacity, StatusBar, BackHandler, Alert } from 'react-native';
import {f, auth, database} from './config/config';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';
// import * as Facebook from 'expo-facebook';
// import * as Google from 'expo-google-app-auth';

function Doorway({navigation}) {

    // Login with Facebook
    /*
    async function loginWithFacebook(){
        const {type, token} = await Facebook.logInWithReadPermissionsAsync(
            '421489402152235',
            {
                permissions: [
                'email',
                'public_profile'
                ]
            }
        );

        if(type === 'success'){        
            const credentials = f.auth.FacebookAuthProvider.credential(token);
            f.auth().signInWithCredential(credentials).catch((error) => {
                console.log('Error: ', error);
            })
        }
    }
    */

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
        'Helvetica-Light': require('./assets/fonts/HelveticaNeue-Light.ttf')
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
        <View
            style={{
                top: 160
            }}
            >
            <Text style={{fontFamily: 'Monoton', fontSize: 28, color: 'white'}}>CHESSQUILAB</Text>
        </View>
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
            {/*
            <TouchableOpacity
                style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    paddingHorizontal: 53,
                    paddingVertical: 8.5,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => {
                    loginWithFacebook,
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
                }}
            >
                <Feather name="facebook" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'white',
                    borderWidth: 2,
                    paddingHorizontal: 54,
                    paddingVertical: 8.5,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => {
                    BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
                }}
            >
                <FontAwesome name="google" size={20} color="white" />
            </TouchableOpacity>
            */}
        </View>
        </View>
        </>
    );
};
}

export default Doorway;