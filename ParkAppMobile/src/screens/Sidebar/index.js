import React, {Component} from "react";
import {View} from "react-native";
import {
  Container,
  Content,
  Text,
  Icon,
  List,
  Left,
  Right,
  Body,
  ListItem,
  Thumbnail,
  Item,
  Input,
  Button,
  Badge
} from "native-base";
import PropTypes from "prop-types";
import {NavigationActions,StackActions} from "react-navigation";
import data from "./data";
import styles from "./style";
import {AsyncStorage} from 'react-native';
import axios from "axios";

const profileImg = require("../../../assets/contacts/sanket.png");
const userData = [
  {
    thumbnail: profileImg,
    name: "Younes AI",
    description: "View your profile",
    link: "Profile"
  }
];

const menuItems = [
  {
    link: "HomeTabNavigation",
    icon: "ios-calendar",
    text: "Home",
    bg: "#9acd32"
  },
  // {
  //   link: "NearbyFriends",
  //   icon: "ios-pin",
  //   text: "Nearby Friends",
  //   bg: "#fc6c85"
  // },
  {
    link: "BlankPage",
    icon: "ios-color-wand",
    text: "Blank Page",
    bg: "#ffb66c"
  },
  {
    link: "Posts",
    icon: "ios-color-wand",
    text: "Posts",
    bg: "#ffb66c"
  }
];

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({routeName: "Login"})]
});

const navigateAction = item =>
  NavigationActions.navigate({
    routeName: "ChatScreen",
    params: { item }
});


class SideBar extends Component {
  static propTypes = {
    closeDrawer: PropTypes.func
  };

  constructor(props){
    super();
    // this.willBlurListener = this.props.navigation.addListener("willBlur", () => {
    //   this.sendData();
    // });

    this.state = {
      currentUser: null,
      contacts: []
    };

    this.logout = this.logout.bind(this);
  }

  async componentWillMount(){
    const user = await AsyncStorage.getItem("user"); 
    this.setState({ currentUser: JSON.parse(user) }, () => {
      this.getAllUsers();
    });
  }

  async componentWillReceiveProps(){
    const user = await AsyncStorage.getItem("user"); 
    this.setState({ currentUser: JSON.parse(user) });
  }

  async config(){
    const token = await AsyncStorage.getItem("token"); 
    return {
      headers: {
          "x-access-token": token,
      }
    }
  }

  sendData(){
    alert("From Sidebar");
  }

  logout(){
    this.handleLogout();
  }

  async handleLogout(){
    await axios.post("http://192.168.1.2:9000/api/logout", null, this.config())
    .then( () => {
      this.destorySession();
      this.props.navigation.navigate("Login");
    })
    .catch( () => {
      this.destorySession();
      this.props.navigation.navigate("Login");
    });

  }

  async destorySession(){
    await AsyncStorage.removeItem("token");  
    await AsyncStorage.removeItem("user");  
  }

  async getAllUsers(){
    var self = this;
    const { currentUser } = this.state;
    await axios.get("http://192.168.1.2:9000/api/users", this.config())
    .then(function(res){
        const users = res.data.filter( (user) => user.id !== currentUser.id );
        console.log("users : ",users);
        self.setState({ contacts: users });
    });
  }


  render() {
    const navigation = this.props.navigation;
    const { contacts, currentUser } = this.state;
    console.log(currentUser);
    
    if(currentUser === null){
      return null
    }

    return (
      <Container>
        <Content style={styles.drawerContent}>
         
          <List
            dataArray={[currentUser]}
            renderRow={userDataRow => (
              <ListItem
                button
                thumbnail
                noBorder
                onPress={() => navigation.navigate("Profile", { currentUser: currentUser })}
                style={styles.userDataListitem}
              >
                <Left>
                  <Thumbnail square source={{ uri: userDataRow.imageProfile }} />
                </Left>
                <Body style={{ borderBottomWidth: 0 }}>
                  <Text style={styles.userDataNameText}>
                    {userDataRow.login}
                  </Text>
                  <Text style={styles.userDataDescriptionText}>
                    View your profile
                  </Text>
                </Body>
                <Right style={{ borderBottomWidth: 0, paddingLeft: 5 }}>
                  <Icon
                    name="ios-arrow-forward"
                    style={styles.userDataArrowIcon}
                  />
                </Right>
              </ListItem>
            )}
          />
          <View style={styles.backWhite}>
            <View style={styles.menuHeadView}>
              <Text style={styles.menuHeaderText}>Favourites</Text>
              <List
                dataArray={menuItems}
                renderRow={menuItemRow => (
                  <ListItem
                    button
                    iconLeft
                    noBorder
                    style={{ paddingTop: 8, paddingBottom: 4 }}
                    onPress={() => {
                      navigation.navigate(menuItemRow.link);
                    }}
                  >
                    <View
                      style={{
                        ...styles.menuIconContainerView,
                        ...{ backgroundColor: menuItemRow.bg }
                      }}
                    >
                      <Icon name={menuItemRow.icon} style={styles.menuIcon} />
                    </View>
                    <Text style={styles.menuItemText}>{menuItemRow.text}</Text>
                  </ListItem>
                )}
              />
                      
              {/* <ListItem
                button
                iconLeft
                noBorder
                style={{ paddingTop: 5 }}
                onPress={() => {
                  navigation.dispatch(resetAction);
                }}
              >
                <View
                  style={{
                    ...styles.menuIconContainerView,
                    ...{ backgroundColor: "#c0c0c0" }
                  }}
                >
                  <Icon name="ios-log-out" style={styles.menuIcon} />
                </View>
                <Text style={styles.menuItemText}>Log Out</Text>
              </ListItem> */}

            </View>
            <View style={styles.contactListView}>
              <Text style={styles.menuHeaderText}>Recent Contacts</Text>
              <List
                removeClippedSubviews={false}
                dataArray={contacts}
                renderRow={dataRow => (
                  <ListItem
                    thumbnails
                    noBorder
                    style={{ paddingTop: 2, paddingBottom: 2 }}
                    onPress={() => navigation.dispatch(navigateAction(dataRow))}
                  >
                    <Left>
                      <Thumbnail small source={dataRow.avatar} />

                      <Text style={[styles.menuItemText, { marginLeft: -3 }]}>
                        {dataRow.username}
                      </Text>
                    </Left>
                    <Body style={{ borderBottomWidth: 0 }} />
                    <Right style={{ borderBottomWidth: 0, paddingLeft: 5 }}>

                      { dataRow.status === 1 ? <Badge success /> : <Badge error /> }
                    
                    </Right>
                  </ListItem>
                )}
              />
            </View>
          </View>

          <View>
            <Button style={{  }} onPress={this.logout} >
                <Text>Logout</Text>
            </Button>
          </View>

        </Content>
      </Container>
    );
  }
}

export default SideBar;
