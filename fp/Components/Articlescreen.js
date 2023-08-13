import React, { useState, useEffect } from 'react';
import { View, FlatList, Text,ActivityIndicator, StyleSheet,Button,TouchableOpacity } from 'react-native';
import Podcastcard from './Podcastcard';
import Card from './Card';




export default function Articlescreen({navigation,route}) {
  const {language} = route.params;
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [curtag,setCurtag] = useState("economy")
  const tags = ["economy", "companies", "mutual-funds","ipo","startups","stocks","currency","commodity","world"]
  const tagshindi = ["अर्थव्यवस्था", "कंपनियां", "म्यूचुअल-फंड", "आईपीओ", "स्टार्टअप", "स्टॉक", "मुद्रा", "कमोडिटी", "विश्व"]

  useEffect(() => {
    language === "english" ?
    fetch(`http://localhost:3000/articles.json`)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    setArticles(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching articles', error);
  }) : fetch(`http://localhost:3000/articleshindi.json`)
  .then((response) => response.json())
  .then((data) => {
    //console.log(data);
    setArticles(data);
    setLoading(false);
  })
  .catch((error) => {
    console.error('Error fetching articles', error);
  })
  }, []);

  const Tagcard = ({tag,index}) => {
    return (
      <TouchableOpacity onPress={() => setCurtag(language==="english" ? tag : tags[index]) } style={styles.button}>
        <Text style={styles.buttonText}>
          {tag}
        </Text>
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="grey" />
        </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundShape} />
        <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'flex-start',alignContent : 'center', height: '10%',backgroundColor: '#EFEFEF',borderBottomWidth: 2}}>
          <Text style={{fontWeight: 'bold',paddingTop: 20,fontSize: 35,marginLeft: 40}}>
            {language === "english" ? "Finance Articles" : "वित्त लेख"}
          </Text>
        </View>
        <View style={styles.tagcontainer}> 
          {language === 'english' ? tags.map((tag,index) => (
            <Tagcard key = {index} tag={tag} index = {index}/>
          )) : tagshindi.map((tag,index) => (
            <Tagcard key = {index} tag={tag} index = {index}/>
          ))}
        </View >
        {articles[(tags.indexOf(curtag)+1).toString()].map((article, index) => (<Card key ={index} navigation={navigation} curtag = {curtag} title = {article.field} text = {article.text} audioFile = {index} language = {language}/>
        ))}
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundShape: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#EFEFEF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tagcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10,
    marginBottom: 5
  },
  tagtext: {
    fontWeight: 'bold',
    margin: 10,
    backgroundColor: '#EFEFEF',
    fontSize: 15,
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
});


