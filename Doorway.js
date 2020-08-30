import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Doorway({navigation}) {
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
                    paddingHorizontal: 47,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text
                    style={{
                        fontWeight: 'bold'
                    }}                   
                >
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{
                    borderColor: 'black',
                    borderWidth: 2,
                    paddingHorizontal: 40,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Menu')}
            >
                <Text
                    style={{
                        fontWeight: 'bold'
                    }}
                >
                    Sign Up
                </Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default Doorway;