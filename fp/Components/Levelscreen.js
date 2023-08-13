import { View,Text,StyleSheet, TouchableOpacity } from "react-native";

const Levelscreen = ({navigation,route}) => {
    const {language} = route.params;

    return (
        <View style ={styles.container}>
            <View style = {styles.langcontainer}>
            {language === "english" ? <Text style = {styles.text}>
                What is your knowledge level in finance ?
            </Text> : <Text style = {styles.text}>
            वित्त में आपके ज्ञान का स्तर क्या है?
            </Text>}
            
            <TouchableOpacity onPress={() => navigation.navigate('Tutorial',{language: language})} style={styles.button}>
            {language === "english" ? <Text style={styles.buttonText}>beginner</Text> : <Text style={styles.buttonText}>अनाड़ी</Text>}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Articlescreen',{language: language})} style={styles.button}>
            {language === "english" ? <Text style={styles.buttonText}>intermediate</Text> : <Text style={styles.buttonText}>मध्यम</Text>}
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#EFEFEF',
    },
    langcontainer: {
        width: 300,
        height: 300,
        alignItems: 'center',
        backgroundColor: '#DFDFDF',
        paddingTop: 50,
        borderRadius: 8,
    },
    text: {
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold',
        fontSize: 20,

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

export default Levelscreen;