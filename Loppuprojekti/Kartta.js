import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
  Linking,
} from 'react-native';
import MapView, { Callout, Marker } from 'react-native-maps';
import Constants from 'expo-constants';

export default function App() {
  const [sijainti, setSijainti] = useState({
    lat: 60.166628,
    lng: 24.943508,
  });
  const [restaurantDistance, setRestaurantDistance] = useState('2');
  const [restaurants, setRestaurants] = useState();

  async function getRestaurants() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=helsinki,finland&key=AIzaSyCjyREvhASQpXGViuOX3ND66JQRSQLPlPU'`;
    try {
      const fetched = await fetch(url);
      const fetchedJson = await fetched.json();
      const url2 = `http://open-api.myhelsinki.fi/v1/places/?tags_search=Restaurant&distance_filter=${60.166628}%2C${24.943508}%2C${'2'}`;
      const fetchedRestaurants = await fetch(url2);
      const fetchedRestaurantsJson = await fetchedRestaurants.json();
      setRestaurants(fetchedRestaurantsJson.data);
    } catch (e) {
      <Text></Text>;
    }
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          margin: 10,
          fontWeight: 'bold',
          color: '#000000',
          fontSize: 15,
        }}>
        {' '}
        Eikö ruoka onnistunut? Etsi lähin ravintola!
      </Text>
      <MapView
        style={styles.kartta}
        region={{
          latitude: sijainti.lat,
          longitude: sijainti.lng,
          latitudeDelta: sijainti.lat != 60.166628 ? 0.01 : 0.15,
          longitudeDelta: sijainti.lng != 24.943508 ? 0.01 : 0.15,
        }}>
        {restaurants ? (
          restaurants.map((tiedot) => (
            <Marker
              key={tiedot.id}
              coordinate={{
                latitude: tiedot.location.lat,
                longitude: tiedot.location.lon,
              }}>
              <Callout
                tooltip={false}
                onPress={() => Linking.openURL(tiedot.info_url)}>
                <Text style={{ fontWeight: 'bold' }}>{tiedot.name.fi}</Text>
                <Text style={{ width: 300, margin: 10 }}>
                  {tiedot.description.body}
                </Text>
                <Text>{tiedot.info_url}</Text>
              </Callout>
            </Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>
      <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
        <Pressable style={styles.painike} onPress={() => getRestaurants()}>
          <Text style={styles.nappi}>Etsi lähimmät ravintolat</Text>
        </Pressable>
      </View>
      <Text>{'\n'}</Text>
      <Text
        style={{
          margin: 10,
          fontWeight: 'bold',
          color: '#000000',
          fontSize: 10,
        }}>
        huom! tämä on demo, haku ainoastaan Helsingin alueella
      </Text>
      <StatusBar style="auto" />
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
    backgroundColor: '#FF904D',
    padding: 8,
    alignItems: 'center',
    borderColor: '#FFFFFF',
  },
  kartta: {
    width: '100%',
    height: '85%',
  },
  painike: {
    margin: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000000',
    borderRadius: 5,
    backgroundColor: 'green',
    borderWidth: 1,
    height: 40,
    width: 150,
  },
  nappi: {
    color: '#ffffff',
  },
});
