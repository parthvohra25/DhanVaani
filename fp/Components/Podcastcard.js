import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Card from './Card'
import Article from './Article';


const Stack = createNativeStackNavigator();


const PodcastCard = ({curtag,title,text, audioFile,language }) => {
  console.log("recieved in podcastcard " + curtag + " " + audioFile + " " + language);
  return (
    <NavigationContainer independent = {true}>
      <Stack.Navigator>
        <Stack.Screen
          name="Card"
          component={Card}
          initialParams={{curtag:curtag,title: title,text:text, audioFile: audioFile,language:language }}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="Article"
        component={Article}
        options={{title: audioFile}}
        initialParams={{curtag:curtag,title: title,text:text, audioFile: audioFile,language:language }} />
      </Stack.Navigator>
        
    </NavigationContainer>
    
  );
};



export default PodcastCard;
