import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import { Camera, CameraRoll, ToastAndroid } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Constants from 'expo-constants';
import { captureScreen } from 'react-native-view-shot';
import { Ionicons, AntDesign } from '@expo/vector-icons';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [isPreview, setIsPreview] = useState(false);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const cameraRef = useRef();
  const [savedImagePath, setSavedImagePath] = useState('');

  const takeScreenShot = () => {
    captureScreen({
      format: 'jpg',
      quality: 0.8,
    }).then(
      (uri) => {
        setSavedImagePath(uri);
      },
      (error) => console.error('Virhe screenshotissa', error)
    );
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    (async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const takePicture = async function () {
    if (this.camera) {
      const options = { quality: 0.5 };
      const data = await this.camera.takePictureAsync(options).then((data) => {
        ToastAndroid.show(data.uri, ToastAndroid.SHORT);
        CameraRoll.saveToCameraRoll(data.uri);
        console.log(data);
      });
      console.log(data.uri);
    }
  };

  const cancelPreview = async () => {
    await cameraRef.current.resumePreview();
    setIsPreview(false);
  };

  const PreView = () => (
    <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
      //
      <Image
        style={styles.logoLogo}
        source={require('./assets/photoframe.png')}
      />
    </TouchableOpacity>
  );

  const renderCaptureControl = () => (
    <View style={styles.control}>
      <Image
        style={styles.tinyLogo}
        source={require('./assets/photoframe.png')}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        disabled={!isCameraReady}
        onPress={takeScreenShot}
        style={styles.capture}>
        <Ionicons name="md-camera" size={50} color="black" />
      </TouchableOpacity>
      <Text style={styles.text}>
        {savedImagePath ? `Kuva tallennettu\n${savedImagePath}` : ''}
      </Text>
    </View>
  );

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text style={styles.text}>Ei lupaa kameralla</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.container}
        type={Camera.Constants.Type.back}
        flashMode={Camera.Constants.FlashMode.off}
        onCameraReady={onCameraReady}
        onMountError={(error) => {
          console.log('kameravirhe', error);
        }}
      />
      <View style={styles.container}>
        {isPreview && PreView()}
        {!isPreview && renderCaptureControl()}
      </View>
    </SafeAreaView>
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
    backgroundColor: 'transparent',
    borderColor: '#FF904D',
  },
  closeButton: {
    flexDirection: 'row',
    position: 'relative',
    top: '151%',
    left: '31%',
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF904D',
    opacity: 1,
  },
  control: {
    position: 'absolute',
    flexDirection: 'row',
    bottom: 60,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capture: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
    height: 50,
    width: 100,
  },
  text: {
    flexDirection: 'row',
    position: 'absolute',
    top: 140,
    left: -25,
    fontSize: 8,
    color: '#000',
  },
  logoLogo: {
    position: 'absolute',
    bottom: '10%',
    left: '10%',
    width: 100,
    height: 100,
  },
  tinyLogo: {
    position: 'absolute',
    bottom: '200%',
    left: '70%',
    width: 100,
    height: 100,
  },
});
