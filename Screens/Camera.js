/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
'use strict';
import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Dimensions, Image } from 'react-native';
import { Button, Text, Content, Icon, Container, Body, Spinner } from 'native-base';
import { RNCamera } from 'react-native-camera';
import CameraRoll, { saveToCameraRoll } from "@react-native-community/cameraroll";
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/database';

console.disableYellowBox = true;


const { width } = Dimensions.get('window');
const db = firebase.database();


export default class Camera extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayPhoto: false,
      photoUri: '',
    };
    this.takePicture = this.takePicture.bind(this);
    this.backToCamera = this.backToCamera.bind(this);
  }

  backToCamera = () => {
    console.log(this.state.displayPhoto);
    this.setState({displayPhoto : false});
  }

  getThisPhoto = async () => {
    const photo = await CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    });
    this.setState({photoUri : photo.edges[0].node.image.uri});
    console.log(this.state.photoUri);
  }

  uploadPhoto = async (navigation) => {
    console.log(this.state.photoUri);
    //this.uploadImage(this.state.photoUri);
    const imageRef = firebase.storage().ref('images/original.jpg');
    let partialUri = this.state.photoUri.toString().slice(5, -7);
    let photoPATH = 'assets-library://asset/asset.JPG?id=' + partialUri + '&ext=JPG';
    imageRef.putFile(photoPATH).catch((error) => {
      console.log(error);
    });
    const id = Math.random().toString(36).substr(2, 9);
    await db.ref('change').set(id);
    alert('photo uploaded!');
    navigation.navigate('Detection');
  }

  /*  uploadImage = ({ uri, mime = 'image/jpeg' }) => {
    return new Promise((resolve, reject) => {
      console.log(uri);
      const imageRef = firebase.storage().ref('images/001.jpg');
      let partialUri = uri.toString().slice(5, -7);
      let photoPATH = 'assets-library://asset/asset.JPG?id=' + partialUri + '&ext=JPG';
      imageRef.putFile(photoPATH).catch((error) => {
        console.log(error);
      });
    });
  } */

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
      { !this.state.displayPhoto ?
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
      :
      <View style={styles.modalContainer}>
        <Image source={{uri: this.state.photoUri}} style={styles.image}/>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.backToCamera} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Back to Camera </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.uploadPhoto(navigation)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Upload Photo </Text>
          </TouchableOpacity>
        </View>
      </View>
      }
    </View>
    );
  }

  takePicture = async() => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      await CameraRoll.saveToCameraRoll(data.uri);
      alert('Success', 'Photo added to cameraRoll');
      await this.getThisPhoto();
      console.log('after alert');
      this.setState({displayPhoto: true});
      console.log(this.state.displayPhoto);
    }
  };
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  shareButton: {
    alignContent: 'center',
    position: 'absolute',
    width: 300,
    padding: 10,
    bottom: 0,
    left: 0,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

//<Image source={require('./images/image.jpg')} />