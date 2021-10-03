import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./common/context/Auth.context";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import MyNavbar from "./components/Layout/Navbar/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import { CartProviderWrapper } from "./common/context/Cart.context";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CartProviderWrapper>
          <MyNavbar />
          <App />
          <Footer />
        </CartProviderWrapper>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
