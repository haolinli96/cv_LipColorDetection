/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';



const LipCard = ({ item }) => {
    return (
          <Card style={{height: 580, flex:1}}>
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
              <Image source={{uri: item.lipstickUri}} style={{height: 430, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Text style={{fontSize:15}} >Share</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
    );

};

export default LipCard;
