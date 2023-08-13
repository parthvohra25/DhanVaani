import { View, FlatList, Text,ActivityIndicator, StyleSheet,Button,TouchableOpacity } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Card from './Components/Card';
import Article from './Components/Article';
import Articlescreen from './Components/Articlescreen';
import Languagescreen from './Components/Languagescreen';
import Levelscreen from './Components/Levelscreen';
import Tutorial from './Components/Tutorial';
import Quiz from './Components/Quiz';

const Stack = createNativeStackNavigator();

export default function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Languagescreen"
          component={Languagescreen}
          
        />
        <Stack.Screen
          name="Levelscreen"
          component={Levelscreen}
          
        />
        <Stack.Screen
          name="Tutorial"
          component={Tutorial}
        />
        <Stack.Screen 
        name="Articlescreen"
        component={Articlescreen}
         />
         <Stack.Screen
          name="Card"
          component={Card}
          
        />
        <Stack.Screen 
        name="Article"
        component={Article}
         />
         <Stack.Screen 
        name="Quiz"
        component={Quiz}
         />
      </Stack.Navigator>
        
    </NavigationContainer>
  );
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


