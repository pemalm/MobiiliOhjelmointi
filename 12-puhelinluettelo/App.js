import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [data] = useState({});

  const [contact, setContact] = useState({});
  
  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });
      setContact(data);
    }
  };

  if (contact.length > 0) {
    console.log(contact);

    return (
      <View style={styles.container}>
        <View style={styles.lista}>
          <FlatList
            data={contact}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {
              try {
                return (
                  <View>
                    <Text>
                      Nimi: {item.name} {'\n'}
                      Numero: {item.phoneNumbers[0].number} {'\n'}
                      ---
                    </Text>
                  </View>
                );
              } catch {
                return (
                  <View>
                    <Text>
                      Nimi: {item.name}
                      {'\n'}
                      ei numeroa {'\n'}
                      ---
                    </Text>
                  </View>
                );
              }
            }}
          />
        </View>
        <Button title="Yhteystiedot" onPress={getContacts} />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Button title="Yhteystiedot" onPress={getContacts} />
        <StatusBar style="auto" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lista: {
    flex: 2,
    alignItems: 'center',
    margin: 10,
  },
});
