import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';


const play = require('../assets/play.png')
const pause = require('../assets/pause.png')
const restart = require('../assets/restart.png')

const Article = ({navigation,route}) => {
    const { curtag,title,text,audioFile,language } = route.params;
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
    console.log('recieved in Article.js' + title);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(1);

    useEffect(() => {
        loadAudio();
    }, []);


    const handlerestart = async () => {
        if (sound) {
          await sound.setPositionAsync(0);
        }
      };

    const handlePlayPause = async () => {
        if (sound) {
            if (isPlaying) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const loadAudio = async () => {
        try {
            console.log("recieved audio file " + audioFile);
            let uri = "";
            language === "english" ? uri = `http://localhost:3000/audio_eng/${curtag}_eng/${audioFile}.mp3` :
                                    uri = `http://localhost:3000/audio_hin/${curtag}_hin/${audioFile}.mp3`
            const { sound } = await Audio.Sound.createAsync({ uri });
            const status = await sound.getStatusAsync();
            const dur = status.durationMillis;
            setDuration(dur);
            setSound(sound);
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    };
  return (
    <View style={styles.container}>
        <Text style={styles.body}>{title}{text}</Text>
        <View style={styles.buttons}>
        <TouchableOpacity onPress={handlePlayPause} style={[styles.playPauseButton, { margin: 5 }]}>
                    <Image source={isPlaying ? pause : play} style={styles.audioIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlerestart} style={[styles.playPauseButton, { margin: 5 }]}>
                    <Image source={restart} style={styles.audioIcon} />
        </TouchableOpacity>
        </View>
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#e6e4e4',
        margin: 15,
    },
    body: {
        margin: 15,
        fontWeight: 400,
    },
    audioIcon: {
        width: 30,
        height: 30,
        margin: 5,

    },
    title: {
        fontWeight: 'bold',
    },
    playPauseButton: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: '#eee',
    },
    button: {
        backgroundColor: '#fff',
        color: 'black',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export default Article