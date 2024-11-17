import React from 'react';
import { View, Text, Modal, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface SortModalProps {
  isVisible: boolean;
  toggleModal: () => void;
  sortType: 'date' | 'name' | 'size';
  setSortType: (type: 'date' | 'name' | 'size') => void;
}

const SortModal: React.FC<SortModalProps> = ({ isVisible, toggleModal, sortType, setSortType }) => {

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={toggleModal}>
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Sort Notes By</Text>
            <Picker
              selectedValue={sortType}
              onValueChange={(itemValue: 'date' | 'name' | 'size') => setSortType(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Date of Creation" value="date" />
              <Picker.Item label="Name" value="name" />
              <Picker.Item label="Size" value="size" />
            </Picker>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={toggleModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  closeButton: {
    backgroundColor: '#007bff',
    padding: 10,
    marginTop: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SortModal;
