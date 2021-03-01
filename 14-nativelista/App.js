import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const db = SQLite.openDatabase('ostoslistadb.db');

export default function App() {
  const [tuote, setTuote] = useState('');
  const [maara, setMaara] = useState('');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'create table if not exists ostoslistadb (id integer primary key not null, tuote text, maara text);'
      );
    });
    updateList();
  }, []);

  // Tallenna
  const saveItem = () => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into ostoslistadb (tuote, maara) values (?, ?);',
          [tuote, maara]
        );
      },
      null,
      updateList
    );
  };

  // Päivitä
  const updateList = () => {
    db.transaction((tx) => {
      tx.executeSql('select * from ostoslistadb;', [], (_, { rows }) =>
        setLista(rows._array)
      );
    });
  };

  // Poista
  const deleteItem = (id) => {
    db.transaction(
      (tx) => {
        tx.executeSql(`delete from ostoslistadb where id = ?;`, [id]);
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
        leftComponent={{ icon: 'g-translate', color: 'green' }}
        centerComponent={{ text: ' OSTOSLISTA ', style: { color: 'white' } }}
      />
      <TextInput
        placeholder="nimike"
        style={styles.nimike}
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
      <Button
        raised
        icon="cart-outline"
        onPress={saveItem}
        title=" Tallenna "
        buttonStyle={{ backgroundColor: 'green' }}
      />
      <Text style={styles.lista}>Ostoslista</Text>
      <Text></Text>
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listcontainer}>
            <Text style={{ fontSize: 18 }}>
              {item.tuote}, {item.maara}
            </Text>
            <Icon
              name="close-circle-outline"
              reverse
              color="red"
              onPress={() => deleteItem(item.id)}
            />
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
