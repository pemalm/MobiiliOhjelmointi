import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity,} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';

const db = SQLite.openDatabase('muistilista.db');

export default function App() {
  const [muistio, setMuistio] = useState('');
  const [lista, setLista] = useState([]);
    const [copiedText, setCopiedText] = useState('')

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists muistilista (id integer primary key not null, tuote text);'
      );
    });
    updateList();
  }, []);

  // Tallenna
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql('insert into muistilista (tuote) values (?);', [muistio]);
      },
      null,
      updateList
    );
    setMuistio('');
  };

  // Päivitä
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from muistilista;', [], (_, { rows }) =>
        setLista(rows._array)
      );
    });
  };

  // Poista
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from muistilista where id = ?;`, [id]);
      },
      null,
      updateList
    );
  };

  const listSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Header
        leftComponent=<Ionicons name="md-fast-food" size={34} color="white" />
        centerComponent={{
          text: ' Omat reseptit ',
          style: { fontSize: 20, color: 'white' },
        }}
        rightComponent=<Ionicons name="md-cart" size={34} color="white" />
      />

      <TextInput
        placeholder=" kirjoita resepti"
        style={styles.nimike}
        onChangeText={(nimike) => setMuistio(nimike)}
        value={muistio}
        multiline={true}
      />
      <Text></Text>
      <Button
        raised
        onPress={saveItem}
        title=" Tallenna "
        buttonStyle={{ backgroundColor: '#FF904D' }}
      />
      <Text style={styles.lista}>Tallennetut reseptit</Text>
      <Text></Text>
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Ionicons
              name="md-trash"
              size={32}
              color="red"
              onPress={() => deleteItem(item.id)}
            />
            <Text style={{ fontSize: 18 }}>{item.tuote}{item.recipe}</Text>
          </View>
        )}
        data={lista}
        ItemSeparatorComponent={listSeparator}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    left: 10,
    bottom: 20,
    right: 10,
    borderWidth: 5,
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ffffff',
    padding: 8,
    alignItems: 'center',
    borderColor: '#FF904D',
  },
  listcontainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    width: 400,
  },
  separator: {
    height: 1,
    width: '50%',
    backgroundColor: '#FF904D',
    marginLeft: '15%',
    marginTop: 10,
    marginBottom: 10,
  },
  nimike: {
    marginTop: 10,
    fontSize: 20,
    width: 300,
    height: 200,
    borderWidth: 1,
    textAlignVertical: 'top',
    color: '#FF904D',
    borderColor: '#FF904D',
    textDecorationLine: 'none',
  },
  lista: {
    marginTop: 30,
    width: 300,
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#FF904D',
  },
});
