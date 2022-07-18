import React from "react";
import "./App.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Chat from "./components/Chat/Chat";
import ProtectedRoute from "./components/Router/ProtectedRoute";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSmile, faImage } from "@fortawesome/free-regular-svg-icons";
import {
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell,
} from "@fortawesome/free-solid-svg-icons";

library.add(
  faSmile,
  faImage,
  faSpinner,
  faEllipsisV,
  faUserPlus,
  faSignOutAlt,
  faTrash,
  faCaretDown,
  faUpload,
  faTimes,
  faBell
);

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path="/" component={Chat} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route path={"*"} render={() => <h1>404 - Page Not Found</h1>} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
