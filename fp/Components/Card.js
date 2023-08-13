import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet,Button } from 'react-native';


const Card = ({navigation, curtag,title,text,audioFile,language}) => {

    return (
            <View>
            <TouchableOpacity onPress={() => navigation.navigate('Article',{curtag:curtag,title: title,text:text, audioFile: audioFile,language:language })} style={styles.button}>
                    <Text style={styles.buttonText}>{title}</Text>
            </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    audioIcon: {
        width: 30,
        height: 30,
        margin: 5,
    },
    title: {
        fontWeight: 'bold',
    },
    playPauseButton: {
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 7,
        padding: 5,
        paddingHorizontal: 10,
        margin: 5,
        marginVertical: 10,
        height: 70,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
      },
});


export default Card;