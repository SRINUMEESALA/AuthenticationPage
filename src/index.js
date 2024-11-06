import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "semantic-ui-css/semantic.min.css";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./store/reducer";
// import { ApolloProvider } from "@apollo/client";
// import customApolloClient from "./ApolloClientSetUp";

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <ApolloProvider client={customApolloClient}> */}
      <App />
      {/* </ApolloProvider> */}
    </Provider>
  </React.StrictMode>
);
