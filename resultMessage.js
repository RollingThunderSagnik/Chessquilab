import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');






class Result extends Component {

    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
        <View style={styles.box}>
            <View 
                style={{ 
                height: 30,
                flexDirection:'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                paddingHorizontal:22
                }}>
                    <Text style={styles.header}>MATCH OVER</Text>
                </View>
            <Text style={styles.text}>{this.props.result?'YOU WON :)':'YOU LOST :('}</Text>           
        </View>);
    }
}
export default Result;
// export default function(props) {
//     const navigation = useNavigation();
  
//     return <ReceivedGameCard {...props} navigation={navigation} />;
// }


const styles = StyleSheet.create({
    header : {
        color: '#000',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 19,
    },
    text :{
        color: '#000',
        fontFamily: 'TTNorms-Medium',
        fontSize: 17,
    },
    box: {
        alignItems:'center',
        // padding:20,
        paddingBottom: 0,
        // flexDirection: 'row'
    },
  });
