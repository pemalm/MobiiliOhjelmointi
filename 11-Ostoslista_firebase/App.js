import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: '',
  authDomain: 'ostoslista-ae925.firebaseapp.com',
  databaseURL: 'https://ostoslista-ae925-default-rtdb.firebaseio.com/',
  projectId: 'ostoslista-ae925',
  storageBucket: 'ostoslista-ae925.appspot.com',
  messagingSenderId: '',
};

firebase.initializeApp(firebaseConfig);

export default function App() {
  const [tuote, setTuote] = useState('');
  const [maara, setMaara] = useState('');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    updateList();
  }, []);

  const updateList = () => {
    firebase
      .database()
      .ref('items/')
      .on('value', (snapshot) => {
        const data = snapshot.val();
        const prods = Object.values(data);
        setLista(prods);
      });
  };

  const saveItem = () => {
    firebase.database().ref('items/').push({ product: tuote, amount: maara });
    updateList();
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.nimike}
          placeholder="nimike"
          onChangeText={(nimike) => setTuote(nimike)}
          value={tuote}
        />
        <TextInput
          placeholder="määrä"
          keyboardType="numeric"
          style={styles.maara}
          onChangeText={(lukema) => setMaara(lukema)}
          value={maara}
        />
        <Button onPress={saveItem} title=" Tallenna " />
      </View>
      <Text style={styles.lista}>Ostoslista</Text>
      <Text></Text>
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.product}, {item.amount}
            </Text>
          </View>
        )}
        data={lista}
        ItemSeparatorComponent={listSeparator}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#000',
    marginLeft: '10%',
    marginTop: 10,
    marginBottom: 10,
  },
  nimike: {
    marginTop: 30,
    fontSize: 18,
    width: 200,
    borderColor: '#000',
    borderWidth: 1,
  },
  maara: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
    width: 200,
    borderColor: '#000',
    borderWidth: 1,
  },
  lista: {
    marginTop: 30,
    fontSize: 20,
    textDecorationLine: 'underline',
  },
});
