import React, { Component } from "react";
import { View, TouchableOpacity, Text, Image, FlatList, AsyncStorage } from "react-native";
import { connect } from "react-redux";
import {
  Container,
  Content,
  Icon,
  ListItem,
  Header,
  Left,
  Right,
  Body,
  Title,
  Button,
  Thumbnail
} from "native-base";
import { itemsFetchData } from "../../actions";
import datas from "./data.json";
import styles from "./styles";
import IconMD from "react-native-vector-icons/MaterialCommunityIcons";
import { thisExpression } from "@babel/types";


const chatContactsImg = require("../../../assets/chatcontacts.png");
const profileImg = require("../../../assets/contacts/sanket.png");

class Settings extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: null,
    }
  }

  async componentDidMount() {
    const currentUser = await AsyncStorage.getItem("user"); 
    this.setState({ currentUser: JSON.parse(currentUser) });
    this.props.fetchData(datas);
  }
  _renderItem = ({ item }) => {
    return (
      <View style={styles.settingsContainerView}>
        <ListItem style={{ marginTop: 7 }} icon>
          <Left>
            <View
              style={{
                ...styles.iconContainerView,
                ...{ backgroundColor: item.bg }
              }}
            >
              {item.name === "Instant Games" ? (
                <IconMD name={item.icon} size={24} color="white" />
              ) : (
                <Icon
                  name={item.icon}
                  style={{
                    ...styles.optionIcon,
                    left: item.last ? 8 : item.divider ? 3 : undefined
                  }}
                />
              )}
            </View>
          </Left>
          <Body>
            <Text>{item.name}</Text>
          </Body>
          <Right />
        </ListItem>
      </View>
    );
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <Container>
        <Header>
          <Left>
            {/* <Button transparent onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button> */}
          </Left>
          <Body>
            <Title>Settings</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => navigation.openDrawer()}>
              <Icon name="md-menu" style={{color: "white"}} />
            </Button>
          </Right>
        </Header>

        <Content style={styles.content}>
          <TouchableOpacity
            style={styles.nameContainerBtn}
            onPress={() => navigation.navigate("Profile")}
          >
            <Thumbnail circle source={profileImg} />
            <View style={styles.nameContainerView}>
              <Text style={styles.userNameText}>Younes AI</Text>
              <Text style={styles.viewProfileText}>View your Profile</Text>
            </View>
            <Icon name="arrow-forward" style={styles.arrowForwardIcon} />
          </TouchableOpacity>
          <FlatList
            data={this.props.items}
            renderItem={this._renderItem}
            keyExtractor={item => item.id}
          />
        </Content>
      </Container>
    );
  }
}

function bindAction(dispatch) {
  return {
    fetchData: url => dispatch(itemsFetchData(url))
  };
}

const mapStateToProps = state => ({
  items: state.settingsReducer.items,
  hasErrored: state.settingsReducer.hasErrored,
  isLoading: state.settingsReducer.isLoading
});
export default connect(
  mapStateToProps,
  bindAction
)(Settings);
