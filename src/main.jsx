import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import store from "@/redux/store";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "@/assets/scss/main.scss";
import 'rsuite/dist/rsuite.min.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
