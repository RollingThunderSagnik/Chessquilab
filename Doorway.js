import React from 'react';
import { View, Text, TouchableOpacity, StatusBar } from 'react-native';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

function Doorway({navigation}) {

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
                onPress={() => navigation.navigate('Login')}
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
                onPress={() => navigation.navigate('SignUp')}
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