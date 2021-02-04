// React:lla toteutettu osoitteenhaku, karttapalveluna Mapquest
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// oletussijainti käyttäjän nykyinen
export default function App() {
  const [coords, setCoords] = useState({
    // käytetään jatkossa coords (ei coordinates), tehtävänannon ohjeistuksen mukaisesti.
    latitude: 0,
    longitude: 0,
    //latitudeDelta: 0.0322,
    //longitudeDelta: 0.0221,
  });
  const [osoite, setOsoite] = useState('');
  const [location, setLocation] = useState(null);
  const getLocation = async () => {
    //Check permission
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location');
    } else {
      let location = await Location.getCurrentPositionAsync({});
      //setLocation(location); (tämä kesti pitkään tajuta, miksi sijaintia ei löydy)
      setCoords({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  // key on mapquest:in luoma yksilöllinen tunnus. https://developer.mapquest.com/documentation/geocoding-api/address/get/
  const getCoords = () => {
    fetch(
      `http://www.mapquestapi.com/geocoding/v1/address?key=WGC75IA0l1nzqfEQkyk86ZANi4WpT8xV&location=${osoite}`
    )
      .then((result) => result.json())
      .then((data) =>
        setCoords({
          //asetetaan haettavan kohteen koordinaatit
          // tämä olikin hankalampi, kun suoraan en löytänyt ohjeita. StackOverflow:sta löytyi json joka toimi, en tiedä onko juuri oikeanlainen tähän.
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
          latitude: coords.latitude,
          longitude: coords.longitude,
          //jostain syystä nämä ei voi olla oletusarvoina coords constructorissa
          //latitudeDelta: coords.latitudeDelta,
          //longitudeDelta: coords.longitudeDelta,
          latitudeDelta: 0.0322, 
          longitudeDelta: 0.0221,
        }}>
        <Marker // merkkipallero
          coordinate={{
            latitude: coords.latitude,
            longitude: coords.longitude,
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
        <Button style={styles.button} onPress={getCoords} title="Hae" />
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
