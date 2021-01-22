import React, { useState, useRef } from 'react';
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';

export default function App() {		
	
	const [tulos, setTulos]=useState('');
	const [A, setA]=useState('');
	const [B, setB]=useState('');
	const aA = parseFloat(tulos.A);
    const bB = parseFloat(tulos.B);
    
	return(
        <View style={styles.container}>
        <Text>Tulos: {tulos}</Text>
        <TextInput style={{ width: 100, margin: 10, borderColor: 'gray', borderWidth: 1 }}
        keyboardType = 'number-pad'
        onChangeText={text => setA(text)}
        value={A}
        />
        <TextInput style={{ width: 100, margin: 10, borderColor: 'gray', borderWidth: 1 }}
        keyboardType = 'number-pad'
        onChangeText={text => setB(text)}
        value={B}
        />
        <View style={{ flexDirection: 'row' }}>
            <Button title=" + " onPress={ tulos => setTulos(parseFloat(A) + parseFloat(B)) }
        />
			<Button title=" - " onPress={ tulos => setTulos(parseFloat(A) - parseFloat(B)) }
        />
                </View>
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