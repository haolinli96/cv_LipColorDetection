/* eslint-disable prettier/prettier */
/* eslint-disable semi */
import React from 'react';
import firebase from 'react-native-firebase';
import RNFetchBlob from 'react-native-fetch-blob';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = ({ uri, mime = 'application/octet-stream' }) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      let uploadBlob = null;
      const storageRef = firebase.storage();
      const imageRef = storageRef.child('images/001.jpg');
      fs.readFile(uri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
          uploadBlob = blob;
          return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
          resolve(url)
      })
      .catch((error) => {
          reject(error)
      })
    });
  };
}

export default uploadImage;
