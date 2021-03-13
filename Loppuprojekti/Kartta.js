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
    lat: 60.166640739,
    lng: 24.943536799,
  });
  const [ravintola, setRavintola] = useState();

  async function getRavintola() {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=helsinki,finland&key=AIzaSyCjyREvhASQpXGViuOX3ND66JQRSQLPlPU'`;
    try {
      const fetched = await fetch(url);
      const fetchedJson = await fetched.json();
      const url2 = `http://open-api.myhelsinki.fi/v1/places/?tags_search=Restaurant&distance_filter=${60.166640739}%2C${24.943536799}%2C${'2'}`;
      const haetutRavintolat = await fetch(url2);
      const haetutJSON = await haetutRavintolat.json();
      setRavintola(haetutJSON.data);
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
          latitudeDelta: 0.0667,
          longitudeDelta: 0.0667,
        }}>
        {ravintola ? (
          ravintola.map((tiedot) => (
            <Marker
              key={tiedot.id}
              coordinate={{
                latitude: tiedot.location.lat,
                longitude: tiedot.location.lon,
              }}>
              <Callout
                tooltip={false}
                onPress={() => {
                  Linking.openURL(tiedot.info_url);
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                  {tiedot.name.fi}
                </Text>
                <Text
                  style={{
                    width: 200,
                    margin: 1,
                    color: '#000000',
                    fontSize: 16,
                  }}>
                  Ravintolan tiedot:{'\n'}
                  {tiedot.description.body}
                </Text>
                <Text style={{ color: '#FF904D', fontSize: 14 }}>
                  {'\n'}Ravintolan nettiosoite:{'\n'}
                </Text>
                <Text style={{ color: '#FF904D', fontSize: 12 }}>
                  {tiedot.info_url}
                </Text>
                <Text>Klikkaa lisätietoja</Text>
              </Callout>
            </Marker>
          ))
        ) : (
          <></>
        )}
      </MapView>
      <View style={{ flexDirection: 'row', padding: 4, alignItems: 'center' }}>
        <Pressable style={styles.painike} onPress={() => getRavintola()}>
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
