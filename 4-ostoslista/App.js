import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from 'react-native';

export default function App() {
  const clear = () => {
    setMuisti([]);
  };
  const [syote, setSyote] = useState('');
  const [muisti, setMuisti] = useState([]);
  const buttonPressed = () => {
    setMuisti([...muisti, { key: syote }]);
    setSyote('');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>

      <View style={styles.container}>

        <TextInput
          style={{ width: 150, padding: 7, borderWidth: 2 }}
          value={syote}
          onChangeText={(syote) => setSyote(syote)}
        />

        <View
          style={{
            margin: 20,
            flex: 2,
            flexDirection: 'row',
            alignItems: 'flex-start',
          }}>

         <Button
            style={{ alignContent: 'space-between' }}
            onPress={buttonPressed}
            title="Lisää"
          />

          <Button
            style={{ alignContent: 'space-between' }}
            onPress={clear}
            title="Tyhjennä"
          />
        </View>
      </View>

      <View style={{ alignItems: 'center', margin: 10, flex: 2 }}>

        <Text style={{ color: 'blue', fontWeight: 'bold' }}>Ostoslista</Text>

        <FlatList
          data={muisti}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    marginTop: 70,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});