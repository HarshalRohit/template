import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

import * as DS2 from 'deepspeech2-edge-inference';

export default function App() {

  const downloadDS2 = async () => {
    
    console.log("Downloading DS2 Files...")
    
    // const url = 'https://srivalab-compute.cse.iitk.ac.in:5040/ml_models/layers_model/model.json'
    const baseUrl = 'https://srivalab-compute.cse.iitk.ac.in:5040'
    try {
      // const model = await tf.loadLayersModel(url);
      // console.log(model);
      await DS2.fetchAndPersistObjsForTranscription(baseUrl);
      console.log("Downloaded Successfully")

      const obj = await DS2.getTranscriptionObj();
      obj.model.summary()
      
    } catch (error) {
      console.log("Download Failed", error);
    } 
  }

  useEffect(() => {
    tf.ready()
    .then(() => console.log('TF backend ready'))
    .then(() => downloadDS2())
    .catch((err) => console.error(err));
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
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
