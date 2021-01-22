import React, { useState } from 'react';
import { TextInput, StyleSheet, Button, Text, View, Alert } from 'react-native';

var numero = Math.floor(Math .random() * 100) + 1;
var maara = -1;
var arvaa = 0;
var oikea = 0;

export default function App() {
    const [arvaa, setArvaa] = useState(0);
    const [oikea, setOikea] = useState(0);
  
if (arvaa == oikea){
  maara++;
}

if (arvaa == 0){
  return (<View style={styles.container}>
    <Text>Arvaa numero välillä 1-100</Text>
    <TextInput style={{ width: 100, margin: 10, borderColor: 'gray', borderWidth: 1 }} keyboardType = 'number-pad' oikea={oikea}
      onChangeText={oikea => setOikea(oikea)}
    />
    <Button title="Arvaa numero!" onPress={arvaa => setArvaa(oikea)} />
  </View>
    )
    
}

if (arvaa > numero){
  return(<View style={styles.container}>
      <Text>Arvauksesi {arvaa} on liian suuri</Text>
    <TextInput style={{ width: 100, margin: 10, borderColor: 'gray', borderWidth: 1 }} keyboardType = 'number-pad' oikea={oikea}
      onChangeText={oikea => setOikea(oikea)}
    />
    <Button title="Arvaa numero!" onPress={arvaa => setArvaa(oikea)} />
    </View>
    )
}

if (arvaa < numero){
  return(<View style={styles.container}>
      <Text>Arvauksesi {arvaa} on liian pieni</Text>
    <TextInput style={{ width: 100, margin: 10, borderColor: 'gray', borderWidth: 1 }} keyboardType = 'number-pad' oikea={oikea}
      onChangeText={oikea => setOikea(oikea)}
    />
    <Button title="Arvaa numero!" onPress={arvaa => setArvaa(oikea)} />
    </View>
    )
}

else if (arvaa == numero){
  Alert.alert(      "ONNISTUIT",
      "Arvasit oikein käyttäen " + maara + " arvausta.",
      [
        { text: "Lopeta peli", onPress: () => console.log("lopetus") }
      ],
      { cancelable: false });
  return null;
}}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
});