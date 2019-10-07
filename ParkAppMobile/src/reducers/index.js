import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import settingsReducer from "../screens/Settings/reducer";

export default combineReducers({
  form: formReducer,
  settingsReducer
});
