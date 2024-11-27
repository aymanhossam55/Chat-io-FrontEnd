import "react-toastify/dist/ReactToastify.css";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "react-loading-skeleton/dist/skeleton.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
