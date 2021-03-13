import React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Linking,
} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import Constants from 'expo-constants';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default class App extends React.Component {
  state = {
    hasLocationPermission: false,
    latitude: 0,
    longitude: 0,
    restaurantList: [],
  };

  componentDidMount() {
    this.getLocationAsync();
  }

  async getLocationAsync() {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === 'granted') {
      let location = await Location.getCurrentPositionAsync({});
      this.setState({
        hasLocationPermissions: true,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } else {
      alert('Location permission not granted');
    }
  }

  styles = StyleSheet.create({
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
      borderColor: '#FFffff',
    },
    otsikko: {
      fontSize: 22,
      color: '#FF904D',
      fontStyle: 'italic',
    },
    teksti: {
      fontSize: 18,
      color: '#000000',
      fontStyle: 'normal',
    },
    osoite: {
      fontSize: 20,
      color: '#000000',
      fontStyle: 'normal',
    },
  });

  handleRestaurantSearch = () => {
    console.log('here');
    const url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
    const location = `location=${this.state.latitude},${this.state.longitude}`;
    const radius = '&radius=5000';
    const type = '&keyword=restaurant';
    const fields = '&name,vicinity';
    const key = '&key=AIzaSyCjyREvhASQpXGViuOX3ND66JQRSQLPlPU'; //google api-developer key
    const restaurantSearchUrl = url + location + radius + type + fields + key;
    fetch(restaurantSearchUrl)
      .then((response) => response.json())
      .then((result) => this.setState({ restaurantList: result }))
      .catch((e) => console.log(e));
  };

  render() {
    console.log(this.state.restaurantList.results);
    return (
      <View style={this.styles.container}>
        <Text>Kartta aukeaa osoitetta klikkaamalla</Text>
        <FlatList
          data={this.state.restaurantList.results}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <Text style={this.styles.otsikko}>
              {item.name}
              {'\n\n'}
              <Text style={this.styles.teksti}>Osoite:{'\n'}</Text>
              <Text
                style={this.styles.osoite}
                onPress={() => {
                  Linking.openURL('https://maps.google.com?q=' + item.vicinity);
                }}>
                {item.vicinity}
                {'\n'}
                </Text>
                <Text>{'\n'} ----- {'\n'}</Text>
            </Text>
          )}
          style={{
            backgroundColor: '#ffffff',
            width: '90%',
            margin: 40,
            padding: 5,
            fontSize: 20,
          }}
        />

        <TouchableOpacity onPress={() => this.handleRestaurantSearch()}>
          <Text
            style={{
              backgroundColor: '#ffffff',
              color: '#000000',
              padding: 20,
              marginBottom: 10,
              fontSize: 20,
            }}>
            <Ionicons name="md-restaurant" size={20} color="black" />
            Listaa ravintolat 5km säteellä
          </Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    );
  }
}
