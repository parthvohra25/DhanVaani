import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import { useState,useEffect } from 'react';
import { Audio } from 'expo-av';

const play = require('../assets/play.png')
const pause = require('../assets/pause.png')
const restart = require('../assets/restart.png')

const Course = ({language,topic, content,index}) => {
   console.log("index recieved " + index + " topic revieved " + topic);
    const [displaycontent,setDisplaycontent] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [sound, setSound] = useState(null);
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
            let uri = "";
            
              language === "english" ? uri = `http://localhost:3000/eng/${index}.mp3` :
                                    uri = `http://localhost:3000/hin/${index}.mp3`
            
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
        <View>
            <TouchableOpacity onPress={() => setDisplaycontent(!displaycontent)} style={styles.button}>
            <Text style={styles.buttonText}>
                {language === "english" ? "What is " + topic : topic + " क्या है"} ?
            </Text>
            </TouchableOpacity>

            {displaycontent && (
              <View>
                <Text style = {styles.contenttext}>
                    {content}
                    </Text>
                    <View style={styles.buttons}>
              <TouchableOpacity onPress={handlePlayPause} style={[styles.playPauseButton, { margin: 5 }]}>
                          <Image source={isPlaying ? pause : play} style={styles.audioIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handlerestart} style={[styles.playPauseButton, { margin: 5 }]}>
                          <Image source={restart} style={styles.audioIcon} />
              </TouchableOpacity>
              </View>
              </View>
                    
                )}
        </View>
    );

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
      backgroundColor: 'black',
      color: 'black',
      marginVertical: 6,
      paddingLeft: 5,
      borderRadius: 6,
  },
  buttons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  contenttext: {
    fontWeight: 400,
    fontSize: 17,
    padding: 5,
  }
});

export default Course;
