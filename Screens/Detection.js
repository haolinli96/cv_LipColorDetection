/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon } from 'native-base';

import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';
import '@react-native-firebase/storage';


import LipCard from '../Components/LipCard';
console.disableYellowBox = true;

const db = firebase.database();

const dummy = [
   {
    colorUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw78d6cf2f/images/62510YSL/Swatches/62510YSL_4.jpg?sw=336&sh=444&sm=fit&q=70',
    lipstickUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw6955a35b/images/62510YSL/3365440197480.jpg?sw=640&sh=846&sm=fit&q=70',
    brand: 'YSL',
    name: '04 - Rouge Ballet',
  },
  {
    colorUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw447d21f3/images/62510YSL/Swatches/62510YSL_16.jpg?sw=336&sh=444&sm=fit&q=70',
    lipstickUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw7d5f1cbc/images/62510YSL/3365440562141.jpg?sw=336&sh=444&sm=fit&q=70',
    brand: 'YSL',
    name: '16 - Orange Majorelle',
  },
 {
    colorUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dw762de918/images/62510YSL/Swatches/62510YSL_43.jpg?sw=336&sh=444&sm=fit&q=70',
    lipstickUri: 'https://www.yslbeautyus.com/dw/image/v2/AANG_PRD/on/demandware.static/-/Sites-ysl-master-catalog/default/dwe4ba93ef/images/62510YSL/3614271280237.jpg?sw=336&sh=444&sm=fit&q=70',
    brand: 'YSL',
    name: '43 - Rose Rive Gauche',
  },
]

const Detection = () => {

  const [lipsticks, setLipsticks] = useState([]);
  const [imageUrl, setImageUrl] = useState('');


  const getData = async () => {
    console.log('////////////');

    const imageRef = firebase.storage().ref('images/send0.jpg');
    const url = await imageRef.getDownloadURL();
    console.log(url);
    setImageUrl(url);

    db.ref('selected/face0/').on('value', snap => {
      console.log('$$$$$$$$');
      //console.log(snap.val());
      //console.log(snap.val().l1.brand);
      const arr = [];
      Object.values(snap.val()).map(key => {
        arr.push(key);
      });
      console.log(arr);
      setLipsticks(arr);
    }, error => {
      console.log('???????');
      console.log(error);
    })
  }

  return (
    <Container>
      <ScrollView>
        <Button iconLeft info onPress={getData}>
          <Icon type="Entypo" name="shopping-bag" />
          <Text>get lipsticks</Text>
        </Button>
        <Image source={{uri: imageUrl}} style={{height: 430, width: null, flex: 1}}/>
        <ScrollView horizontal={true}>
        {
          lipsticks.map((item, index) =>
            <LipCard key={index} item={item} />)
        }
       </ScrollView>
     </ScrollView>
    </Container>
  );

};

export default Detection;
