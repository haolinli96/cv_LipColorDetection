/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';

console.disableYellowBox = true;


const LipCard = ({ item }) => {
    return (
          <Card style={{height: 600, flex:1}}>
            <CardItem >
              <Left>
                <Thumbnail source={{uri: item.colorUri}} />
                <Body>
                  <Text>{ item.brand }</Text>
                  <Text note>{ item.name }</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: item.lipstickUri}} style={{height: 450, width: null, flex: 1}} resizeMode="contain"/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent fontSize="50">
                  <Icon fontSize="30" name="share"/>
                </Button>
              </Left>
              <Right>
                <Text note style={{fontSize:15}}>{ item.series }</Text>
              </Right>
            </CardItem>
          </Card>
    );

};

export default LipCard;
