import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import TextTicker from 'react-native-text-ticker'
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
            <TextTicker 
                style={styles.text}
                // duration={3000}
                loop
                scrollSpeed={300}
                animationType={'scroll'}
                repeatSpacer={10}
                scroll
                >
                {'NAXALITE TEEN APPREHENDED BY POLICE, TEN CARTONS OF AMMUNITION FOUND'}
            </TextTicker>           
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
