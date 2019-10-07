import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Text, Left, Button, Icon, Body, Title, Right, Content, Input, Label, Item, ListItem, Form, List, Card, InputGroup } from 'native-base';
import { Dimensions } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import styles from "./styles";
import { Field, reduxForm } from "redux-form";
import IconMD from "react-native-vector-icons/MaterialIcons";

const commonColor = require("../../theme/variables/commonColor");

const required = value => (value ? undefined : "Required");
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined;
const maxLength15 = maxLength(15);
const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;
const minLength8 = minLength(8);
const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? "Invalid email address"
    : undefined;
const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? "Only alphanumeric characters"
    : undefined;


// create a component
class InfoPage extends Component {

    textInput: Any;

    constructor(props){
        super();
        this.state = {
            currentPassword: "",
            newPassword: "",
            email: "",
            num: "",
            page: "",
            data: null
        }

        this.onChangeHandler = this.onChangeHandler.bind(this);
    }

    componentDidMount(){
        if(this.props !== null){
            const data = this.props.navigation.state.params;
            this.setState({data});
            this.handlerTarget(data.value, data.page);
        }
    }

    handlerTarget(value, page){
        switch (page){
            case "phone":
                this.setState({num: value, page});
                break;
            case "email":
                this.setState({email: value, page});
                break;
            case "password":
                this.setState({page});
                break;
        }
    }

    handleSubmit = (name) => {
        
        switch (name){
            case "phone": return this.phoneSubmit();
            case "email": return this.emailSubmit();
            case "password": return this.passwordSubmit();
        }

    }

    phoneSubmit(){
        const { num } = this.state;
        if (num.length !== 10){
            console.log("phone number contains 10 numbers");
        }

        // update the phone number :

        // clearn the state :
        this.setState({num: "", page: "", data: null});

        // redirect to the previouse page :
        this.props.navigation.goBack();
    }

    emailSubmit(){
        const { email } = this.state;
        if (email.length >= 10){
            console.log("email contains at least 10 letters");
        }

        // update the Email :

        // clearn the state :
        this.setState({email: "", page: "", data: null});

        // redirect to the previouse page :
        this.props.navigation.goBack();
    }

    passwordSubmit(){
        const { newPassword, currentPassword } = this.state;
        
        if((newPassword.length && currentPassword.length) < 6){
            console.log("nop");
            return;
        }

        // update the password : 

        // clean the state :
        this.setState({currentPassword: "", newPassword: "", page: "", data: null});

        // redirect to the previouse page :
        this.props.navigation.goBack();
    }


    phoneView = () => {
        return (
            <View style={styles.formContainerView}>
            <View style={styles.formView}>
            <Field
                name="Phone Number"
                component={this.renderInput}
                type="text"
                someValue={this.state.num}
                onChangeHandler={this.onChangeHandler}
                targetName="num"
                iconName="smartphone"
                //validate={[email, required]}
            />

            <Button
                block
                style={styles.saveBtn}
                onPress={() => this.handleSubmit("phone")}
            >
                <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                Save
                </Text>
            </Button>
            </View>
        </View>
        )
    }

    emailView = () => {
        return (
            <View style={styles.formContainerView}>
                <View style={styles.formView}>
                    <Field
                        name="Email"
                        component={this.renderInput}
                        type="email"
                        someValue={this.state.email}
                        onChangeHandler={this.onChangeHandler}
                        targetName="email"
                        iconName="email"
                        //validate={[email, required]}
                    />

                    <Button
                        block
                        style={styles.saveBtn}
                        onPress={() => this.handleSubmit("email")}
                    >
                        <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                        Save
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }

    passwordView = () => {
        return (
            <View style={styles.formContainerView}>
                <View style={styles.formView}>
                    <Field
                        name="Current Password"
                        component={this.renderInput}
                        type="password"
                        onChangeHandler={this.onChangeHandler}
                        targetName="currentPassword"
                        iconName="lock"
                        validate={[required]}
                    />

                    <Field
                        name="New Password"
                        component={this.renderInput}
                        type="password"
                        onChangeHandler={this.onChangeHandler}
                        targetName="newPassword"
                        iconName="lock"
                        validate={[required]}
                    />

                    <Button
                        block
                        style={styles.saveBtn}
                        onPress={() => this.handleSubmit("password")}
                    >
                        <Text style={{ lineHeight: 16, fontWeight: "bold" }}>
                        Save
                        </Text>
                    </Button>
                </View>
            </View>
        );
    }

    ViewHandler(){
        const { page } = this.state;
        switch (page){
            case "phone":
                return this.phoneView();
            case "email":
                return this.emailView();
            case "password":
                return this.passwordView();
        }
    }

    onChangeHandler(event, name){
        const { text } = event.nativeEvent;
        this.setState({[name]: text}, () => {
            console.log("currentPassword : ", this.state.currentPassword + "\n" + "New password : " + this.state.newPassword);
        });
    }

    renderInput({ input, label, type, meta: { touched, error, warning }, someValue, onChangeHandler, targetName, iconName }) {

        return (
          <View>
            <Item error={error && touched} style={styles.inputGrp}>
              <IconMD
                active
                name={iconName}
                color={commonColor.contentTextColor }
                size={20}
              />
              <Input
                ref={c => (this.textInput = c)}
                onChange={(event) => onChangeHandler(event, targetName)}
                placeholderTextColor={commonColor.lightTextColor}
                style={{ color: commonColor.contentTextColor }}
                placeholder={input.name}
                defaultValue={someValue}
                secureTextEntry={type === "password" ? true : false}
                //{...input}
              />
              {touched && error
                ? <Icon
                    active
                    style={styles.formErrorIcon}
                    onPress={() => this.textInput._root.clear()}
                    name="close"
                  />
                : <Text />}
            </Item>
            {touched && error
              ? <Text style={styles.formErrorText1}>
                  {error}
                </Text>
              : <Text style={styles.formErrorText2}>error here</Text>}
          </View>
        );
    }

    render() {
        const navigation = this.props.navigation;
        let { width } = Dimensions.get('window');
        width = width * 0.9;
        return (
            <Container style={styleInfo.container} >

                <Header >
                    <Left style={{flex:1}} >
                        <Button  transparent onPress={() => navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                </Header>

                <Content>

                    { this.state.data !== null ?  this.ViewHandler() : null }

                </Content>

            </Container>
        );
    }
}

// define your styles
const styleInfo = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },


});

const Info = reduxForm({
    form: "InfoPage"
  })(InfoPage);
//make this component available to the app
export default Info;
