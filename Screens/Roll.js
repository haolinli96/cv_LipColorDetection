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
} from 'react-native';
import CameraRoll from "@react-native-community/cameraroll";

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

  const uploadPhoto = () => {
    alert('photo uploaded!');
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
                  onPress={() => indexSeletction(i)}>
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
