import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { Audio } from 'expo-av';

const play = require('../assets/play.png')
const pause = require('../assets/pause.png')
const restart = require('../assets/restart.png')

const Quiz = ({ navigation, route }) => {
  const { language } = route.params;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [data, setData] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [duration, setDuration] = useState(1);

  useEffect(() => {
    try {
      if (language === 'english') {
        fetch('http://localhost:3000/quiz.json')
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      } else {
        fetch('http://localhost:3000/quizhindi.json')
          .then((response) => response.json())
          .then((data) => {
            setData(data);
          });
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    loadAudio(currentQuestionIndex);
}, [currentQuestionIndex]);

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

const loadAudio = async (index) => {
    try {
        let uri = "";
        
          language === "english" ? uri = `http://localhost:3000/quiz/${index+1}.mp3` :
                                uri = `http://localhost:3000/quizhindi/${index+1}.mp3`
        
        const { sound } = await Audio.Sound.createAsync({ uri });
        const status = await sound.getStatusAsync();
        const dur = status.durationMillis;
        setDuration(dur);
        setSound(sound);
        
        
    } catch (error) {
        console.error('Error loading audio:', error);
    }
};

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < data.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  if (!data) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>{language==="english" ? <Text>You scored {score} out of {data.length}</Text> :
        <Text>आपका स्कोर {score} है {data.length} मई से</Text>}
          
          <TouchableOpacity onPress={() => navigation.navigate('Articlescreen',{language: language})} style={styles.button}>
            {language === "english" ? <Text style={styles.buttonText}>go to article screen</Text> : <Text style={styles.buttonText}>आलेख स्क्रीन पर जाएँ</Text>}
            </TouchableOpacity>
            {score < 15 && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Tutorial', { language: language })}
              style={styles.button}
            >
              {language === 'english' ? (
                <Text style={styles.buttonText}>go to tutorial</Text>
              ) : (
                <Text style={styles.buttonText}>ट्यूटोरियल पर जाएं</Text>
              )}
            </TouchableOpacity>
            )}

        </View>
      ) : (
        <>
          <View style={styles.questionContainer}>
            <Text>{data[currentQuestionIndex].question}</Text>
          </View>
          
          <View style={styles.optionsContainer}>
            {data[currentQuestionIndex].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionButton}
                onPress={() =>
                  handleAnswerOptionClick(index === data[currentQuestionIndex].answerIndex)
                }
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.buttons}>
              <TouchableOpacity onPress={handlePlayPause} style={[styles.playPauseButton, { margin: 5 }]}>
                          <Image source={isPlaying ? pause : play} style={styles.audioIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={handlerestart} style={[styles.playPauseButton, { margin: 5 }]}>
                          <Image source={restart} style={styles.audioIcon} />
              </TouchableOpacity>
            </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  questionContainer: {
    marginBottom: 20,
  },
  optionsContainer: {
    width: '80%',
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#000',
    borderRadius: 7,
    padding: 5,
    paddingHorizontal: 10,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  audioIcon: {
    width: 30,
    height: 30,
    margin: 5,

},
playPauseButton: {
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
}, buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
},
buttonText: {
  color: 'white',
  fontSize: 18,
},
});

export default Quiz;
