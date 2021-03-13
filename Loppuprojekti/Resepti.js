import React, { useState, useRef, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  Button,
  Clipboard,
} from 'react-native';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function App() {
  const [lista, setLista] = useState([]);
  const [item, setItem] = useState('');

  const [haku, setHaku] = useState('burger');
  const [tulos, setTulos] = useState([]);
  const [resepti, setResepti] = useState([]);

  const getTulos = () => {
    const url = `http://www.recipepuppy.com/api/?q=${haku}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTulos(data.results);
      });
    setHaku('');
  };

  const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#000',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#FF904D', fontSize: 20 }}>
        Etsi reseptejä lempiruokiisi
      </Text>

      <Image
        style={{ width: 300, height: 100 }}
        source={require('./assets/ruoka_banner.png')}
      />
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text style={{ color: '#FF904D', fontSize: 20 }}>
              {'\n'}
              {item.title}
              {'\n'}
            </Text>
            <Image
              style={{ height: 100, width: 100 }}
              source={{ uri: item.thumbnail }}
            />
            <Text style={{ color: '#000000', fontSize: 18 }}>
              {'\n'}Sisältää:{'\n'}
              {item.ingredients}
              {'\n'}
            </Text>
            <Text style={{ color: '#000000', fontSize: 18 }}>
              Avaa koko resepti selaimeen:
            </Text>
            <Text
              style={{ color: '#FF904D', fontSize: 18 }}
              onPress={() => {
                Linking.openURL(item.href);
              }}>
              {item.href}
              {'\n'}
            </Text>
            <View style={{ flexDirection: 'row' }}>
              <Text
                onPress={() =>
                  Linking.openURL(
                    'mailto:?subject=Herkkuresepti&body=Katso minkälaisen herkkureseptin löysin!\n\nReseptin nimi on ' +
                      item.title +
                      ',\n\nja sen voit katsoa osoitteesta ' +
                      item.href +
                      '!'
                  )
                }
                style={{
                  color: '#000000',
                  fontSize: 13,
                  fontFamily: 'Arial',
                  fontStyle: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                  marginLeft: 1,
                  marginBottom: 17,
                }}>
                Lähetä sähköpostilla{' '}
                <Ionicons name="md-mail" size={18} color="black" />
              </Text>
              <Text
                onPress={() =>
                  Clipboard.setString(
                    'Reseptin nimi:\n' +
                      item.title +
                      '\nReseptin osoite: ' +
                      item.href
                  )
                }
                style={{
                  color: '#000000',
                  fontSize: 13,
                  fontFamily: 'Arial',
                  fontStyle: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                  marginLeft: 20,
                  marginBottom: 17,
                }}>
                Kopioi leikepöydälle{' '}
                <Ionicons name="md-clipboard" size={18} color="black" />
              </Text>
            </View>
          </>
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
        data={tulos}
      />
      <View>
        <Text style={{ color: '#FF904D' }}>Hae millä tahansa hakusanalla</Text>
        <TextInput
          style={{ fontSize: 18, width: 200, borderWidth: 1, color: '#000000' }}
          value={haku}
          onChangeText={(haku2) => setHaku(haku2)}
        />
        <Text> </Text>
        <Button title="Etsi" onPress={getTulos} />
        <Text> </Text>
      </View>
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
});
