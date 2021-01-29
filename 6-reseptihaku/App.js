// reseptihaku recipepuppy.com osoitteesta
import React, { useState, useRef } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, } from 'react-native';


export default function App() {
  const [haku, setHaku] = useState('');
  const [haku2, setHaku2] = useState('');
  const [tulos, setTulos] = useState([]);

  const getTulos = () => {
    const url = `http://www.recipepuppy.com/api/?i=${haku}&q=${haku2}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTulos(data.results);
      });
  };

  const FlatListItemSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: "100%",
        backgroundColor: "#000",
      }}
    />
  );
};

  return (
    <View style={styles.container}>
    <Text> </Text><Text> </Text>
      <FlatList
        style={{ marginLeft: '5%' }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            <Text>{item.title}</Text>
            <Image
              style={{height:100, width:100}}
              source={{ uri: item.thumbnail }}
            />
          </>
        )}
        ItemSeparatorComponent={FlatListItemSeparator}
        data={tulos}
      />
      <View>
        <Text>Ainesosa</Text>
        <TextInput
          style={{ fontSize: 18, width: 100, borderWidth: 1 }}
          value={haku}
          onChangeText={(haku) => setHaku(haku)}
        />
        <Text>Yleinen haku</Text>
        <TextInput
          style={{ fontSize: 18, width: 100, borderWidth: 1 }}
          value={haku2}
          onChangeText={(haku2) => setHaku2(haku2)}
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});