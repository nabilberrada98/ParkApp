import React, { Component } from "react";
import { Image, StatusBar, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  Item,
  Input,
  Button,
  View,
  Toast,
  Icon
} from "native-base";
import IconMD from "react-native-vector-icons/MaterialIcons";
import { Field, reduxForm } from "redux-form";
import styles from "./styles";
import axios from "axios";
import {AsyncStorage} from 'react-native';

const commonColor = require("../../theme/variables/commonColor");
const logo = require("../../../assets/rndfy-logo.png");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(8);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(3);

const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;

declare type Any = any;

class LoginForm extends Component {
  textInput: Any;
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  login() {
    const { email, password } = this.state;
    if (this.props.valid) {
      //this.props.navigation.navigate("Drawer");
      const data = { email: email, password: password };
      console.log("data : ", data);
      //this.handleLogin(data);
    } else {
      this.messageError();
    }
  }

  async handleLogin(login){
    // var self = this;
    // await axios.post("http://192.168.1.2:9000/api/auth/login", login, { headers: { "content-type": "application/json" } })
    // .then( (res) => {
    //   const data = res.data.login;
    //   if(data){
    //     console.log("Login : ", data);
    //     self.setSession(data.token, data);
    //     this.textInput._root.clear();
    //     this.setState({ email: "", password: "" });
    //     self.props.navigation.navigate("Drawer");
    //   }else{
    //     self.messageError();
    //   }
    // });
  }


  messageError(){
    return (
      Toast.show({
        text: "Enter Valid Username & Password!",
        duration: 2500,
        position: "top",
        style:{marginTop:20},
        textStyle: { textAlign: "center" }
      })

    );
  }

  onChangeHandler(event, name){
    console.log("event : ", event.nativeEvent);
    const { text } = event.nativeEvent;
    this.setState({[name]: text});

  }

  render() {
    const navigation = this.props.navigation;
    return (
      <Container style={styles.backgroundContainer}>
        <StatusBar
          backgroundColor={
            Platform.OS === "android"
              ? commonColor.statusBarColor
              : "transparent"
          }
          barStyle="light-content"
        />
        <Content>
          <View style={styles.logoContainerView}>
            <Image source={logo} style={styles.imageShadow} />
          </View>
          <View style={styles.formContainerView}>
            <View style={styles.formView}>
              
              <View>
                <Item style={styles.inputGrp} >
                  <IconMD
                    active
                    name="mail-outline"
                    color={commonColor.contentTextColor }
                    size={20}
                  />
                  <Input
                    ref={c => (this.textInput = c)}
                    placeholderTextColor={commonColor.lightTextColor}
                    name="email"
                    onChange={(event) => this.onChangeHandler(event, "email")}
                    style={{ color: commonColor.contentTextColor }}
                    placeholder="Email"
                  />
                </Item>
              </View>
              
              <View>
                <Item style={styles.inputGrp} >
                  <IconMD
                    active
                    name="lock"
                    color={commonColor.contentTextColor }
                    size={20}
                  />
                  <Input
                    ref={c => (this.textInput = c)}
                    name="password"
                    placeholderTextColor={commonColor.lightTextColor}
                    onChange={(event) => this.onChangeHandler(event, "password")}
                    style={{ color: commonColor.contentTextColor }}
                    placeholder="Password"
                    secureTextEntry={true}
                  />
                </Item>
              </View>


              <Button
                block
                style={styles.loginBtn}
                onPress={() => this.login()}
              >
                <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                  LOG IN
                </Text>
              </Button> 

            </View>
          </View>
         
        </Content>
      </Container>
    );
  }
}

const Login = reduxForm({
  form: "login"
})(LoginForm);
export default Login;
