import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';

const { width, height } = Dimensions.get('screen');

const GameRequestCard = (props) => {
    let [fontsLoaded] = useFonts({
		'Carme': require('./assets/fonts/Carme-Regular.ttf'),
		'Monoton': require('./assets/fonts/Monoton-Regular.ttf'),
    });

    if (!fontsLoaded) {
		return <AppLoading />;

	} else {

        return (
            <View style={styles.poster}>
                <View style={{flex: 0.7, justifyContent: 'space-evenly'}}>
                    <Text 
                        textBreakStrategy='highQuality' 
                        style={styles.MainEvent}
                    >
                        {props.from} invited you to play a game of {props.event}.
                    </Text>
                </View>
                <View style={{flex: 0.3, flexDirection: 'row', justifyContent: 'space-evenly'}}>

                    <TouchableOpacity style={styles.Accept}>
                        <FontAwesome 
                            name='check' 
                            color='white' 
                            size={14} 
                            style={{paddingLeft: -4, paddingRight: 4}} 
                        />
                        <Text style={{color: 'white', fontFamily: 'Carme'}}>Accept</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.Decline}>
                        <FontAwesome 
                            name='remove' 
                            color='white' 
                            size={14} 
                            style={{paddingLeft: -4, paddingRight: 4}}
                        />
                        <Text style={{color: 'white', fontFamily: 'Carme'}}>Decline</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    }
}

export default GameRequestCard;

const styles = StyleSheet.create({
    poster: {
        width: width * 0.95,
        height: 120,
        borderRadius: 22,
        borderColor: '#FFFFFF',
        borderWidth: 2,
        elevation: 3,
        backgroundColor: 'black',
        shadowOffset: {width: 1, height: 1},
        shadowColor: '#333333',
        shadowOpacity: 0.3,
        shadowRadius: 2,
        marginHorizontal: 4,
        marginVertical: 0,
        marginTop: height * 0.05,
    },
    MainEvent: {
        padding: 12, 
        color: 'white', 
        fontFamily: 'Carme', 
        fontSize: 18
    },
    Accept: {
        flex: 1,
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopWidth: 2, 
        borderTopColor: 'white', 
        borderBottomLeftRadius: 22, 
        borderRightWidth: 1, 
        borderRightColor: 'white'
    },
    Decline: {
        flex: 1, 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        borderTopWidth: 2, 
        borderTopColor: 'white', 
        borderBottomRightRadius: 22, 
        borderLeftWidth: 1, 
        borderLeftColor: 'white'
    }
  });