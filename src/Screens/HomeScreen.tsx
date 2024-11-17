import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import useNotesStore from '../Store/NoteStore';
import SortModal from '../Components/SortModal';
import {formatDate} from '../Utils/DateFormatter';
import NoteItem from '../Components/NoteItem';

const {width} = Dimensions.get('window');

type Note = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  backgroundColor: string;
  headerImage?: string;
};

type HomeScreenProps = {
  navigation: any;
};

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const {notes} = useNotesStore();
  const [sortType, setSortType] = useState<'date' | 'name' | 'size'>('date');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handlePress = () => {
    navigation.navigate('NoteEditor');
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (sortType === 'name') return a.title.localeCompare(b.title);
    if (sortType === 'size') return a.content.length - b.content.length;
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  const toggleSortModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No Notes Available</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>NOTIFY</Text>

      <TouchableOpacity
        style={styles.sortButtonContainer}
        onPress={toggleSortModal}>
        <Image style={styles.sortIcon} source={require('../Assets/sort.png')} />
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Create New Note</Text>
        <Image style={styles.penIcon} source={require('../Assets/pen.png')} />
      </TouchableOpacity>

      <SortModal
        isVisible={isModalVisible}
        toggleModal={toggleSortModal}
        sortType={sortType}
        setSortType={setSortType}
      />

      <FlatList
        data={sortedNotes}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.notesList}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <NoteItem
            note={item}
            onPress={() => navigation.navigate('NoteEditor', {noteId: item.id})}
          />
        )}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000c66',
  },
  notesList: {
    paddingBottom: 80,
  },
  header: {
    alignSelf: 'center',
    color: '#fff',
    fontWeight: 'condensed',
    fontSize: 25,
    letterSpacing: 1.5,
    margin: 20,
  },
  sortButtonContainer: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  sortIcon: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  button: {
    backgroundColor: '#4caae4',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    width: '100%',
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  penIcon: {
    height: 30,
    width: 30,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: 'gray',
  },
});

export default HomeScreen;
