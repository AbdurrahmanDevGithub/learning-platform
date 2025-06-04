import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; 
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import Store from "./redux/Store.jsx";

createRoot(document.getElementById("root")).render(
  
    <Provider store={Store}>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
    </Provider>
  
);
