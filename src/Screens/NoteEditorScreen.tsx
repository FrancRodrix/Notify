import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Toast from 'react-native-toast-message';
import useNotesStore from '../Store/NoteStore';
import ColorPicker from '../Components/ColorPicker';
import HeaderImagePicker from '../Components/HeaderImagePicker';
import { useRoute } from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';


type Note = {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  headerImage?: string | null;
  createdAt: string;
};

type NoteEditorScreenProps = {
  navigation: any;
};

const NoteEditorScreen: React.FC<NoteEditorScreenProps> = ({ navigation }) => {
  const { notes, addNote, updateNote, deleteNote } = useNotesStore();
  const route = useRoute();
  const noteId = route.params?.noteId;
  const existingNote = notes.find(note => note.id === noteId);

  const [title, setTitle] = useState<string>(existingNote?.title || '');
  const [content, setContent] = useState<string>(existingNote?.content || '');
  const [backgroundColor, setBackgroundColor] = useState<string>(existingNote?.backgroundColor || '#FFFFFF');
  const [headerImage, setHeaderImage] = useState<string | null>(existingNote?.headerImage || null);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false); // Cleanup when the component unmounts
    };
  }, []);

  const saveNote = () => {
    if (!title.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'The note must have a title!',
      });
      return;
    }

    const noteData: Note = {
      id: noteId || Date.now().toString(),
      title,
      content,
      backgroundColor,
      headerImage,
      createdAt: existingNote?.createdAt || new Date().toISOString(),
    };

    noteId ? updateNote(noteId, noteData) : addNote(noteData);
    navigation.goBack();

    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Note saved successfully!',
    });
  };

  const copyToClipboard = () => {
    if (content) {
      Clipboard.setString(content);

      Toast.show({
        type: 'info',
        text1: 'Copied',
        text2: 'Content copied to clipboard!',
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Please enter content',
        text2: 'No content available :(',
      });
    }
  };

  const handleDeleteNote = () => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => {
          deleteNote(noteId);
          navigation.goBack();
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flexOne}>
      <View style={styles.flexOne}>
        <ScrollView contentContainerStyle={[styles.container, { backgroundColor }]}>
          <View style={styles.header}>
            <TextInput
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
              style={styles.titleInput}
            />
          </View>

          <TextInput
            placeholder="Content"
            value={content}
            onChangeText={setContent}
            style={styles.contentInput}
            multiline
          />

          <HeaderImagePicker image={headerImage} setImage={setHeaderImage} />

          <ColorPicker selectedColor={backgroundColor} onColorSelect={setBackgroundColor} />

          <View style={styles.buttonsContainer}>
            <View style={styles.childContainer}>
              <TouchableOpacity style={styles.copyButton} onPress={saveNote}>
                <Image style={styles.icon} source={require('../Assets/save.png')} />
                <Text style={styles.buttonText}>Save Note</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
                <Image style={styles.icon} source={require('../Assets/clipboard.png')} />
                <Text style={styles.buttonText}>Copy Content</Text>
              </TouchableOpacity>
            </View>

            {noteId && (
              <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteNote}>
                <Text style={styles.buttonText}>Delete Note</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 16,
  },
  titleInput: {
    fontSize: 18,
    fontWeight: '800',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
  },
  contentInput: {
    fontSize: 16,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor: '#fff',
    marginVertical: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  buttonsContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#4caae4',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  deleteButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  copyButton: {
    flexDirection: 'row',
    backgroundColor: '#4caae4',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
});

export default NoteEditorScreen;
