import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [sana, setSana] = useState('');
  const [sana2, setSana2] = useState('');
  const puhu = () => {
    Speech.speak(sana);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.teksti}
        value={sana}
        onChangeText={(sana) => setSana(sana)}
      />
      <Button title=" Kuuntele " onPress={puhu} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 1,
  },
  teksti: {
    alignItems: 'center',
    width: 100,
    margin: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
});
