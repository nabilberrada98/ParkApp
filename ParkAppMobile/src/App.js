import React from "react";
import { Easing, Animated } from "react-native";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root } from "native-base";
import Login from "./screens/Login/";
import HomeTabNavigation from "./screens/Home/tabNavigation";
import SideBar from "./screens/Sidebar/";


const Drawer = DrawerNavigator(
  {
    HomeTabNavigation: { screen: HomeTabNavigation },
  },
  {
    initialRouteName: "HomeTabNavigation",
    contentComponent: props => <SideBar {...props} />
  }

);

const App = StackNavigator(
  {
    Login: { screen: Login },
  },
  {
    index: 0,
    initialRouteName: "Login",
    transitionConfig: TransitionConfiguration,
    headerMode: "none",
  }
);

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; 
      const transition = params.transition || 'default'; 
      return {
        collapseExpand: CollapseExpand(index, position),
      }[transition];
    },
  }
}

export default () =>
  <Root>
    <App />
  </Root>;
