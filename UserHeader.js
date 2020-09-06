import React from 'react';
import { View, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const { width, height } = Dimensions.get('screen');

export default function UserHeader(props) {

    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View 
                style={{
                    paddingTop: 22,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    backgroundColor: 'black',
                    paddingVertical: 12
                }}
            >
                <Image 
                    source={{uri: 'https://api.adorable.io/avatars/400/name'}} 
                    style={{
                        padding: 4,
                        resizeMode: 'cover', 
                        borderRadius: 50, 
                        width: 80, 
                        height: 80
                    }} 
                />
                <View 
                    style={{
                        width: width*0.5, 
                        flexDirection: 'column', 
                        justifyContent: 'space-evenly'
                    }}
                >
                    <Text 
                        allowFontScaling 
                        adjustsFontSizeToFit 
                        numberOfLines={1} 
                        style={{
                            color: 'white', 
                            fontFamily: 'Carme', 
                            fontSize: 36, 
                            justifyContent: 'space-evenly', 
                            alignSelf: 'center'
                        }}
                    >
                        Hello World
                    </Text>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity style={{marginHorizontal: 2, marginVertical: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 8}}>Set Username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.logout()} style={{marginHorizontal: 2, marginVertical: 4, borderColor: 'white', borderWidth: 2, borderRadius: 8, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: 'white',  fontFamily: 'Carme', fontSize: 13, paddingHorizontal: 6}}>Log Out</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    };
};
