import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, FlatList, Button, TextInput } from 'react-native';

export default function App() {
   
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
			<Button
				onPress={() => plussaPressed()}
				title=" + "
			/><Text>   </Text>
			<Button
				onPress={() => miinusPressed()}
				title=" - "
			/></View>
      <Text> </Text>
      <FlatList
      ListHeaderComponent={()=><Text>Edelliset laskut</Text>}
      data={data}
      renderItem={({item}) =>
          <Text>{item.text}</Text>}
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
  }
});








else if (arvaa == numero){
  Alert.alert("OIKEA VASTAUS", "Arvasit oikein, käytit " + maara + " arvausta");
  return null;
}}