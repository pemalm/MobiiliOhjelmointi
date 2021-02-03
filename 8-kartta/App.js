// React:lla toteutettu osoitteenhaku, karttapalveluna Mapquest
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
// oletussijainti Pasilassa, otettu tehtävänannon materiaalista
export default function App() {
  const [coordinates, setCoordinates] = useState({
    latitude: 60.200692,
    longitude: 24.934302,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  const [osoite, setOsoite] = useState('');
  // key on mapquest:in luoma yksilöllinen tunnus. https://developer.mapquest.com/documentation/geocoding-api/address/get/
  const getCoordinates = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=WGC75IA0l1nzqfEQkyk86ZANi4WpT8xV&location=${osoite}`
    )
      .then((result) => result.json())
      .then((data) =>
        setCoordinates({
          //asetetaan haettavan kohteen koordinaatit
          ...coordinates, // tämä olikin hankalampi, kun suoraan en löytänyt ohjeita. StackOverflow:sta löytyi json joka toimi, en tiedä onko juuri oikeanlainen tähän.
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng,
        })
      )
      .catch((err) => Alert.alert(err));
  };

  return (
    <View style={styles.container}>
      <MapView // karttanäkymä
        style={styles.mapView}
        region={{
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          latitudeDelta: coordinates.latitudeDelta,
          longitudeDelta: coordinates.longitudeDelta,
        }}>
        <Marker // merkkipallero
          coordinate={{
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
          }}
          title={osoite} // käyttäjän kirjoittama osoite suoraan tulosteena
        />
      </MapView>
      <View style={styles.bottom}>
        <TextInput
          style={styles.search}
          value={osoite}
          keyboardType="default"
          onChangeText={(text) => setOsoite(text)}
        />
        <Text> </Text>
        <Button style={styles.button} onPress={getCoordinates} title="Hae" />
      </View>
      <Text> </Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  mapView: {
    flex: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom: {
    flex: 1,
    height: 10,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  search: {
    width: 250,
    height: 35,
    borderColor: '#000000',
    borderWidth: 1,
    alignItems: 'center',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 5,
  },
  button: {
    alignItems: 'center',
  },
});
