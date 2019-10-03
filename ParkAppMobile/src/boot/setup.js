import React, { Component } from "react";
import { Provider } from "react-redux";
import { StyleProvider } from "native-base";
import { PersistGate } from "redux-persist/integration/react";
import App from "../App";
import configureStore from "./configureStore";
import getTheme from "../theme/components";
import variables from "../theme/variables/commonColor";

const storeObj = {};
export default class Setup extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
    storeObj.store = this.state.store;
  }
  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store.store}>
          <PersistGate persistor={this.state.store.persistor}>
            <App />
          </PersistGate>
        </Provider>
      </StyleProvider>
    );
  }
}
