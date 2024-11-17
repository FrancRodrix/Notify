import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

// Define the available colors for palete
const colors = ['#FFFFFF', '#FCF951', '#c2df1f', '#CF9FFF', '#ff6f4b'];

const ColorPicker: React.FC<ColorPickerProps> = ({
  selectedColor,
  onColorSelect,
}) => {
  return (
    <View>
      <Text style={styles.headerText}>Choose color palettes here:-</Text>

      <View style={styles.colorContainer}>
        {colors.map(color => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBox,
              {
                backgroundColor: color,
                borderColor: selectedColor === color ? 'grey' : 'transparent',
              },
            ]}
            onPress={() => onColorSelect(color)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 1,
    marginBottom: 8,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 8,
  },
  colorBox: {
    width: 30,
    height: 30,
    borderRadius: 10,
    marginHorizontal: 8,
    borderWidth: 2,
  },
});

export default ColorPicker;
