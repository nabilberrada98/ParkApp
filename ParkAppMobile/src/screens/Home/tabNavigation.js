import React from "react";
import { Dimensions, Platform } from "react-native";
const commonColor = require("../../theme/variables/commonColor");
import { Button, Icon, Footer, FooterTab, Badge, Text } from "native-base";
import IconMD from "react-native-vector-icons/MaterialCommunityIcons";
import IconMI from "react-native-vector-icons/MaterialIcons";
import IconAD from "react-native-vector-icons/AntDesign";
import Home from "./index";
import Settings from "../Settings";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from "react-navigation";
import styles from "./styles";


const { height } = Dimensions.get("window");
const heightRatio = height / 667;
const HomeTabNavigation = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Settings: { screen: Settings }
  },
  {
    tabBarPosition: "bottom",
    lazy: true,
    tabBarComponent: props => {
      return (
        <Footer
          style={{ height: Platform.OS === "ios" ? 57 * heightRatio : null }}
        >
          <FooterTab>
            
            <Button onPress={() => props.navigation.navigate("Home")}>
              {props.navigation.state.index === 0 ? (
                <IconMD
                  name={"calendar-blank"}
                  size={24}
                  color={commonColor.brandPrimary}
                />
              ) : (
                <IconAD name="calendar" size={24} color={"grey"} />
              )}
            </Button>

            <Button onPress={() => props.navigation.navigate("Chat")}>
              <IconMI
                name={
                  props.navigation.state.index === 2
                    ? "chat-bubble"
                    : "chat-bubble-outline"
                }
                color={
                  props.navigation.state.index === 2
                    ? commonColor.brandPrimary
                    : "grey"
                }
                size={24}
              />
            </Button>
 

            <Button onPress={() => props.navigation.navigate("Settings")}>
              <IconMD
                name={
                  props.navigation.state.index === 4
                    ? "settings"
                    : "settings-outline"
                }
                color={
                  props.navigation.state.index === 4
                    ? commonColor.brandPrimary
                    : "grey"
                }
                size={24}
              />
            </Button>

            
          </FooterTab>
        </Footer>
      );
    },
   

  }
);

export default HomeTabNavigation;
