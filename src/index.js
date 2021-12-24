import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./common/context/Auth.context";

import "./index.css";

import { CartProviderWrapper } from "./common/context/Cart.context";

ReactDOM.render(
  <Router>
    <AuthProviderWrapper>
      <CartProviderWrapper>
        <App />
      </CartProviderWrapper>
    </AuthProviderWrapper>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
