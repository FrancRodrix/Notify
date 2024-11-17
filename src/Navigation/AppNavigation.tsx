import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/HomeScreen';
import NoteEditorScreen from '../Screens/NoteEditorScreen';

// Define types for navigation params
type RootStackParamList = {
  Home: undefined;
  NoteEditor: { noteId?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="NoteEditor"
          component={NoteEditorScreen}
          options={({ route }) => ({
            title: route.params?.noteId ? 'Edit Note' : 'New Note',
            headerStyle: styles.headerStyle, 
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// External stylesheet for headerStyle
const styles = {
  headerStyle: {
    backgroundColor: '#f4f4f4',
  },
};

export default AppNavigation;

