// euromuunnin, ensikokeilu käyttää tyylitiedostoa kaikkeen.
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  Picker,
} from 'react-native';

export default function App() {
  const [state, setState] = useState({
    muutettava: '0',
    valuutta: '',
    tulos: '0.00 €',
  });
  const [rates, setRates] = useState([]);

  useEffect(() => {
    fetch('https://api.exchangeratesapi.io/latest')
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch((err) => console.error(err));
  }, []);

  const convertEuro = () => {
    let muutettu = (state.muutettava / rates[state.valuutta]).toFixed(2);
    setState({
      ...state,
      tulos: `${muutettu} €`,
    });
  };

  const ratesArray = () => {
    return Object.keys(rates).map((rate) => {
      return <Picker.Item label={rate} value={rate} />;
    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ height: 150, width: 150 }}
        source={{
          uri:
            'https://raw.githubusercontent.com/pemalm/sekalaista/main/kuva.png',
        }}
      />
      <Text> </Text>
      <Text style={styles.teksti}>
        {state.muutettava} {state.valuutta} on euroina
      </Text>
      <Text style={styles.tulos}>{state.tulos}</Text>
      <View style={styles.inputGroup}>
        <Text>Muunna </Text>
        <TextInput
          keyboardType="number-pad"
          style={styles.textInput}
          value={state.muutettava}
          onChangeText={(e) => setState({ ...state, muutettava: e })}
        />
        <Text> {state.valuutta} </Text>
        <Picker
          valuutta={state.valuutta}
          style={styles.picker}
          onValueChange={(itemValue) =>
            setState({ ...state, valuutta: itemValue })
          }>
          {ratesArray()}
        </Picker>
      </View>
      <Button title="Muunna" onPress={convertEuro} />
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
  inputGroup: {
    flexDirection: 'row',
    margin: 100,
  },
  picker: {
    height: 30,
    width: 80,
    bottom: 1,
    marginLeft: 10,
  },
  tulos: {
    fontSize: 40,
  },
  textInput: {
    fontSize: 25,
    width: 100,
    borderWidth: 1,
    textAlign: 'center',
  },
  teksti: {
    fontSize: 15,
    width: 100,
    borderWidth: 0,
    textAlign: 'center',
  },
});
