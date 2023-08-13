import { View,Text,StyleSheet, TouchableOpacity } from "react-native";

const Languagescreen = ({navigation}) => {
    return (
        <View style ={styles.container}>
            <View style = {styles.langcontainer}>
            <Text style = {styles.text}>
                What is your prefered language ?
            </Text>
            <Text style = {[styles.text,{marginBottom: 30}]}>
            आप किस भाषा के साथ आगे बढ़ना चाहते हैं?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Levelscreen',{language: 'english'})} style={styles.button}>
                    <Text style={styles.buttonText}>English</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Levelscreen',{language : 'hindi'})} style={styles.button}>
                    <Text style={styles.buttonText}>हिंदी</Text>
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

export default Languagescreen;