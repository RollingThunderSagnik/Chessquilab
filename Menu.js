import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function Menu({navigation}) {
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
                    paddingHorizontal: 48,
                    padding: 10,
                    margin: 10,
                    borderRadius: 20
                }}
                onPress={() => navigation.navigate('Chessboard')}                
            >
                <Text
                    style={{
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
                    }}
                >
                    BLM
                </Text>
            </TouchableOpacity>
            
        </View>
    );
};

export default Menu;