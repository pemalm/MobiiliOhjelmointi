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
  const [street, setStreet] = useState('');
  const [regionPosition, setRegionPosition] = useState({
    lat: 60.166628,
    lng: 24.943508,
  });
  const [restaurantDistance, setRestaurantDistance] = useState('2');
  const [restaurants, setRestaurants] = useState();

  async function getRestaurants() {
    const url = `http://www.mapquestapi.com/geocoding/v1/address?key=WGC75IA0l1nzqfEQkyk86ZANi4WpT8xV&location=${street.replace(
      ' ',
      '+'
    )}+Helsinki+Finland`;
    try {
      const fetched = await fetch(url);
      const fetchedJson = await fetched.json();
      const position = fetchedJson.results[0].locations[0].latLng;
      setRegionPosition({ lat: position.lat, lng: position.lng });
      const url2 = `http://open-api.myhelsinki.fi/v1/places/?tags_search=Restaurant&distance_filter=${
        position.lat
      }%2C${position.lng}%2C${'2'}`;
      const fetchedRestaurants = await fetch(url2);
      const fetchedRestaurantsJson = await fetchedRestaurants.json();
      setRestaurants(fetchedRestaurantsJson.data);
    } catch (e) {}
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
        style={styles.mapStyle}
        region={{
          latitude: regionPosition.lat,
          longitude: regionPosition.lng,
          latitudeDelta: regionPosition.lat != 60.166628 ? 0.01 : 0.15,
          longitudeDelta: regionPosition.lng != 24.943508 ? 0.01 : 0.15,
        }}>
        {restaurants ? (
          restaurants.map((r) => (
            <Marker
              key={r.id}
              coordinate={{
                latitude: r.location.lat,
                longitude: r.location.lon,
              }}>
              <Callout
                tooltip={false}
                onPress={() => Linking.openURL(r.info_url)}>
                <Text style={{ fontWeight: 'bold' }}>{r.name.fi}</Text>
                <Text style={{ width: 300, margin: 10 }}>
                  {r.description.body}
                </Text>
                <Text>{r.info_url}</Text>
              </Callout>
            </Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>
      <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
        <Pressable style={styles.showButton} onPress={() => getRestaurants()}>
          <Text style={styles.buttonText}>Etsi lähimmät ravintolat</Text>
        </Pressable>
      </View>
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
  mapStyle: {
    width: '100%',
    height: '85%',
  },
  showButton: {
    margin: 8,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#555',
    borderRadius: 5,
    backgroundColor: 'green',
    borderWidth: 1,
    height: 60,
    width: 100,
  },
  buttonText: {
    color: '#ffe',
  },
});
