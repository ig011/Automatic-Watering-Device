import { createTheme } from "@mui/material/styles";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

const theme = createTheme({
  palette: {
    primary: {
      main: "#303030",
    },
    secondary: {
      main: "#808080",
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
