# Mobiiliohjelmointi lopputyö, "reseptinhaku" 

Ohjelma tehty React Nativella.

## Ohjelmalla voi

- Hakea reseptejä Recipepuppy palvelusta, ja avata alkuperäiset reseptit selaimeen
- Tallentaa omia reseptejä muistio-tyyppisesti
- Ottaa kuvat annoksista
- Voit listata lähimmät ravintolat, sekä avata ulkoisen karttaohjelman osoitteen löytämistä varten

## Toteutus

- Yhtenäinen käyttöliittymä käyttäen Stack Navigatoria ja yhteneväistä ikoni- ja värimaailmaa
- Kamera tehty käyttäen expo-camera:a, ja varsinaisen kuvan ottaminen captureScreen kirjastolla. Tämä sen takia että kuviin saadaan teeman mukaiset kehykset.
- Lähimmät ravintolat listataan käyttäen Googlen nearby-search komentoa, sijainti haetaan automaattisesti käytettävän laitteen gps:n avulla (expo-location)

## Rajapinnat, tekniikkaa ym

- Reseptihaussa recipepuppy API
- Ravintolahaussa Google maps nearbysearch API
- Kamera Expo-Camera, käyttäjälupa pyydetään kameralle sekä laitteen sisäisen muistin käytölle
- Karttahaussa Google Maps API sekä ravintolatiedot open-api.myhelsinki (https://hri.fi/data/dataset/myhelsinki-open-api-paikat-tapahtumat-ja-aktiviteetit)
- Muistio käyttää SQLite open databasea
- Ohjelmassa käytetty erilaisia tapoja toteuttaa painikkeet ja muut käyttäjävalinnat, Button, TouchableOpacity, Pressable sekä suoraan text-komponenttiin liitetty onPress

## Screenshot
 
 <p align="center">
  <img src="/screenshot/1.png" width="200" title="kuva1">
  <img src="/screenshot/2.png" width="200" title="kuva2">
  <img src="/screenshot/3.png" width="200" title="kuva3">
  <img src="/screenshot/4.png" width="200" title="kuva4">
  <img src="/screenshot/5.png" width="200" title="kuva5">
</p>
 
