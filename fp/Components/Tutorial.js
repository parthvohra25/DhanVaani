import {useState,useEffect } from "react";
import { View,Text,StyleSheet,TouchableOpacity } from "react-native";
import Course from "./Course";

const Tutorial = ({navigation,route}) => {
    const {language } = route.params;
    const [coursematerial,setCoursematerial] = useState([]);

    useEffect(() => {
        loadcourse();
      }, []);

    const loadcourse = () => {
        try {
            if(language === "english"){
                fetch('http://localhost:3000/course.json')
            .then((response) => response.json())
                .then((data) => {
                    setCoursematerial(data);});
            }else {
                fetch('http://localhost:3000/coursehindi.json')
            .then((response) => response.json())
                .then((data) => {
                    setCoursematerial(data);});
            }
            
        } catch(err){
            console.log(err);
        }
    }

    return (
        <View style = {{marginTop: 20}}>
         {coursematerial.map((cur, index) => (
            <Course key = {index} language = {language} topic = {cur.topic} content = {cur.content} index = {index}/>
        ))}
        <TouchableOpacity onPress={() => navigation.navigate('Quiz',{language: language})} style={[styles.button,{marginTop: 20}]}>
            <Text style={[styles.buttonText,{textAlign: 'center'}]}>
  {language === "english" ? "go to quiz"  :  "प्रश्नोत्तरी पर जाएँ"}
        </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
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

export default Tutorial;