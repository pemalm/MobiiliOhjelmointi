import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function Muisti({ route, navigation }) {
  const { data } = route.params;
  return (
    <View style={styles.container}>
    <Text>Muistissa olevat</Text>
    <FlatList
    ListHeaderComponent={() => <Text>edelliset laskut</Text>}
    data={data}
    renderItem={({ item }) => <Text> {item.text} </Text>}
    />
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