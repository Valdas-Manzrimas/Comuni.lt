import React from "react";
import ReactDOM from "react-dom/client";

// for rtl format comment out bootstrap.min.css and uncomment bootstrap.rtl.min.css
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/css/bootstrap.rtl.min.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./sass/stylesheet.scss";

import "./index.scss";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
        <App />
      </BrowserRouter>
);

