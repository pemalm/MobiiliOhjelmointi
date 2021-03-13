import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { ImageBackground, Image } from 'react-native';
import AssetExample from './components/AssetExample';
import { Card } from 'react-native-paper';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: 252, height: 185 }}
        source={require('./logo.png')}
      />
      <Text>
        {'\n'}
        {'\n'}
      </Text>
      <Text style={styles.lista}>
        Kuvaa upeita ruokakuvia kameralla{'\n'}
        {'\n'}
        Etsi parhaimmat reseptit{'\n'}
        {'\n'}
        Laita muistiin omat ruokavinkkisi{'\n'}
        {'\n'}
        Kun kaikki muu menee pieleen,{'\n'}löydä lähin ravintola
      </Text>
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
    backgroundColor: '#000000',
    padding: 8,
    alignItems: 'center',
    borderColor: '#FF904D',
  },
  lista: {
    flex: 4,
    color: 'white',
    margin: 1,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
