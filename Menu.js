import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

function Menu({navigation}) {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

    return(
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 44,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontFamily: 'Carme'
                    }}                   
                >
                    October Revolution
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 42,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontFamily: 'Carme'
                    }}
                >
                    Indian Independence
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 78,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontFamily: 'Carme'
                    }}
                >
                    Naxalbari
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 73,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontFamily: 'Carme'
                    }}
                >
                    Nandigram
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 93,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontFamily: 'Carme'
                    }}
                >
                    BLM
                </Text>
            </TouchableOpacity>
            
        </View>
    );
};
}

export default Menu;