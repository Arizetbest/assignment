import React from "react";
import ReactDOM from "react-dom";
import "./index.generated.css";
import * as serviceWorker from "./serviceWorker";
import UserProvider from "./components/UserContext";
import Routes from "./components/Routes";

ReactDOM.render(
  <UserProvider>
    <Routes />
  </UserProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
