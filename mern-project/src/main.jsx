import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux"; // ✅ Import Provider from react-redux
import store from "./redux/store";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
const root = ReactDOM.createRoot(document.getElementById("root")); // ✅ Correct way in React 18

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
