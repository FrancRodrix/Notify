import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';

interface HeaderImagePickerProps {
  image: string | null;
  setImage: (image: string) => void;
}

const HeaderImagePicker: React.FC<HeaderImagePickerProps> = ({
  image,
  setImage,
}) => {
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
    });

    if (result.assets && result.assets.length > 0) {
      const pickedImage = result.assets[0];

      // Save the image to the file system using RNFS
      const newPath = `${RNFS.DocumentDirectoryPath}/${Date.now()}_${
        pickedImage.fileName
      }`;
      await RNFS.copyFile(pickedImage?.uri, newPath);

      // Update the state with the new file path
      setImage(`file://${newPath}`);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Image
          style={styles.buttonIcon}
          source={require('../Assets/pickImage.png')}
        />
        <Text style={styles.buttonText}>Pick image</Text>
      </TouchableOpacity>
      {image ? (
        <Image source={{uri: image}} style={styles.image} />
      ) : (
        <Text style={styles.placeholder}>No Image Selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  buttonIcon: {
    height: 30,
    width: 30,
    marginRight: 10,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 8,
    marginBottom: 0,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#4caae4',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 7,
    marginVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '95%',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 1.6,
  },
});

export default HeaderImagePicker;
