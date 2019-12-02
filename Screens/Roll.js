/* eslint-disable curly */
/* eslint-disable no-alert */
/* eslint-disable prettier/prettier */
/* eslint-disable semi */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import React, { useState } from 'react';

import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Button,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/storage';
import '@react-native-firebase/database';


const db = firebase.database();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const { width } = Dimensions.get('window')

const Roll = ({ navigation }) => {

  const useIndexSelection = () => {
    const [indexState, setIndexState] = useState(null);
    const indexSeletction = (index) => {
      if (index === indexState)
        setIndexState(null);
      else
        setIndexState(index);
    };
    return [ indexState, indexSeletction ];
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [indexState, indexSeletction] = useIndexSelection(null);
  const [selectedURI, setSelectedURI] = useState(null);

  const getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
    .then(r => setPhotos(r.edges));
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  }

  const uploadImage = ({ uri, mime = 'image/jpeg' }) => {
      return new Promise((resolve, reject) => {
        console.log('new Promise')
        console.log(firebase.storage().maxUploadRetryTime);
        console.log(selectedURI)
        //const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        //let uploadBlob = null;
        //const storageRef = firebase.storage().ref();
        //const string = '{ "foo": 1 }';

        const imageRef = firebase.storage().ref('images/001.jpg');
        //console.log('path????')
        //let regex = '/://(.{36})//i';
        let partialUri = selectedURI.toString().slice(5, -7);
        //let result = uriPhoto.match(regex);
        let photoPATH = 'assets-library://asset/asset.JPG?id=' + partialUri + '&ext=JPG';

        imageRef.putFile(photoPATH).catch((error) => {
          console.log(error);
        })
        // fs.readFile(photoPATH, 'base64')
        // .then(data => {
        //   console.log(data.empty())
        //   return Blob.build(data, { type: `${mime};BASE64` })
        // })
        // .then((blob) => {
        //   console.log(blob)
        //     uploadBlob = blob;
        //     return imageRef.put(blob, { contentType: 'image/jpeg' })
        // })
        // .then(() => {
        //   console.log('upload blob')
        //   uploadBlob.close()
        //   return imageRef.getDownloadURL()
        // })
        // .then((url) => {
        //     resolve(url)
        // })
        // .catch((error) => {
        //     console.log(error)
        //     reject(error)
        // })
      });

  }

  const uploadPhoto = async () => {
    console.log(selectedURI);
    uploadImage(selectedURI);
    const id = Math.random().toString(36).substr(2, 9);
    await db.ref('change').set(id);
    alert('photo uploaded!');
    navigation.navigate('Detection');
    toggleModal();
  }


  return (
    <View style={styles.container}>
      <Button
        title="View CameraRoll"
        onPress={() => {
          toggleModal();
          getPhotos();
        }}
      />
      <Modal
        animationType={'slide'}
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => console.log('closed')}>
        <View style={styles.modalContainer}>
          <Button title="Close" onPress={toggleModal} />
          <ScrollView contentContainerStyle={styles.scrollView}>
            {photos.map((p, i) => {
              return (
                <TouchableHighlight
                  style={{opacity: i === indexState ? 0.5 : 1}}
                  key={i}
                  underlayColor="transparent"
                  onPress={() => {
                    indexSeletction(i)
                    console.log(p.node.image.uri);
                    setSelectedURI(p.node.image.uri)}
                  }
                >
                  <Image
                    style={styles.imageView}
                    source={{uri: p.node.image.uri}}
                  />
                </TouchableHighlight>
              )
            })}
          </ScrollView>
          {indexState !== null && (
            <View style={styles.shareButton}>
              <Button title="Upload" onPress={uploadPhoto} />
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    paddingTop: 20,
    flex: 1,
  },
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  shareButton: {
    position: 'absolute',
    width: width,
    padding: 10,
    bottom: 0,
    left: 0,
  },
  imageView: {
    width: width / 3,
    height: width / 3,
  },
})

export default Roll;
