import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {f, auth, database} from './config/config';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('screen');

class Headline extends Component {

    state = {

    }
    constructor(props)
    {
        super(props);
        this.state.width = this.props.width;
    }

    render()
    {
        return (
        <View style={{...styles.box, width: this.state.width}}>
            <Text style={styles.text}>{'NAXALITE TEEN APPREHENDED BY POLICE'}</Text>           
        </View>);
    }
}
export default Headline;

const styles = StyleSheet.create({
    header : {
        color: '#fff',
        fontFamily: 'Gilroy-ExtraBold',
        fontSize: 19,
    },
    text :{
        color: '#fff',
        fontFamily: 'TTNorms-Medium',
        fontSize: 17,
    },
    box: {
        alignItems:'center',
        // padding:20,
        paddingVertical: 5,
        // flexDirection: 'row'
    },
  });
