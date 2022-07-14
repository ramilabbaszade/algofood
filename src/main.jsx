import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import store from "@/redux/store";

import { Provider } from "react-redux";

import "@/assets/scss/main.scss";
import "rsuite/dist/rsuite.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
