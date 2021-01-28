import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Laskin({ navigation }) {
	const [A, setA] = useState(), [B, setB] = useState(), [tulos, setTulos] = useState(), [text, setText] = useState(''), [data, setData] = useState([]);

  const plussaPressed = () => {
    let tulos=0;
    tulos=(parseFloat(A)+parseFloat(B));
    setTulos(tulos);
    const text=`${A} + ${B} = ${tulos}`;
    setText(text);
    setData([...data, { key: String(data.length), text: text}]);
    setA(), setB();
  }
  const miinusPressed = () => {
    let tulos=0;
    tulos=(parseFloat(A)-parseFloat(B));
    setTulos(tulos);
    const text=`${A} - ${B} = ${tulos}`;
    setText(text);
    setData([...data, { key: String(data.length), text: text}]);
    setA(), setB();
  }
			return(
			<View style={{backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center'}}>
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
			<Button onPress={() => plussaPressed()} title=" + " /><Text>   </Text>
			<Button onPress={() => miinusPressed()} title=" - " /><Text> </Text>
      <Button title="Muisti" onPress={() => navigation.navigate('Muisti', { data: data })}
        />
      </View>   
</View>
)}