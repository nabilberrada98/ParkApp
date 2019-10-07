import React, { Component } from "react";
import { Image, View, TouchableOpacity, ListView, StyleSheet, AsyncStorage } from "react-native";
import {
  Container,
  Content,
  Text,
  Thumbnail,
  Card,
  CardItem,
  Left,
  Right,
  Body,
  Header,
  Item,
  Input,
  Icon,
  Button
} from "native-base";
import data from "./data";
import styles from "./styles";
import IconMD from "react-native-vector-icons/MaterialIcons";
import IconI from "react-native-vector-icons/Ionicons";
import axios from "axios";

const chatContactsImg = require("../../../assets/chatcontacts.png");
const profileImg = require("../../../assets/contacts/sanket.png");
const notificationImg = require("../../../assets/notification.png");
const live = require("../../../assets/live.png");
const photo = require("../../../assets/cam.png");
const checkIn = require("../../../assets/checkin.png");

class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: null,
      posts: null,
    };
  }


  render() {
  const navigation = this.props.navigation;

  return (
      <Container>
        <Header style={stylesCss.header} >

          <Left style={{flex: 1}} >
            <Icon name="md-menu" onPress={() => navigation.openDrawer()} style={{color: "white"}} />
          </Left>
        </Header>
        <Content style={styles.content}>
          <View style={styles.listViewBlock}>
            
            <Text>Hi parkApp</Text>

          </View>
        </Content>
      </Container>
    );
  }
}

const stylesCss = StyleSheet.create({
  header: {
    paddingRight: 15,
    paddingLeft: 15
  },
});

export default Home;
