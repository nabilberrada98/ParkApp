import React from "react";
import Setup from "./src/boot/setup";

export default class App extends React.Component {

  constructor(props){
    super(props);

  }

  render() {
    console.disableYellowBox = true;
    return <Setup />;
  }
}
