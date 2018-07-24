import 'babel-polyfill';
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "react-apollo";

import Client from "./Client"
import App from "./App";
import ScrollToTop from "./ScrollToTop";
import registerServiceWorker from "./registerServiceWorker";
import "./styles/fontawesome/webfonts/fontawesome-all.css";
import "./styles/main.css";

// ApolloProvider wraps the root component and provides ApolloClient features
// to all child components. Similar to how the redux Provider does the same for state
ReactDOM.render(
  <ApolloProvider client={Client}>
    <BrowserRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);

registerServiceWorker();
