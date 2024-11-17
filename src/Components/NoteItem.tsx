import React from 'react';
import {TouchableOpacity, Text, Image, StyleSheet} from 'react-native';
import {formatDate} from '../Utils/DateFormatter';

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  backgroundColor: string;
  headerImage?: string;
};

type NoteItemProps = {
  note: Note;
  onPress: () => void;
};

const NoteItem: React.FC<NoteItemProps> = ({note, onPress}) => {
  const renderHeaderImage = (image: string | undefined) => {
    if (image) {
      return <Image source={{uri: image}} style={styles.headerImage} />;
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={[styles.noteItem, {backgroundColor: note.backgroundColor}]}
      onPress={onPress}>
      {renderHeaderImage(note.headerImage)}
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{formatDate(note.createdAt)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    width: '100%',
    marginVertical: 12,
    borderRadius: 10,
    elevation: 5,
    overflow: 'hidden',
    padding: 20,
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    justifyContent: 'flex-start',
  },
  headerImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 15,
    resizeMode: 'cover',
    borderBottomWidth: 4,
    borderBottomColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: '#777',
  },
});

export default NoteItem;
