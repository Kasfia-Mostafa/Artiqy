import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { Provider } from "react-redux";
import store from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import App from "./App";
import AuthProviders from "./Authentication/Providers/AuthProvides";

const persistor = persistStore(store);

const rootElement = document.getElementById("root") as HTMLElement;


ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AuthProviders>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <App />
        <Toaster />
      </PersistGate>
    </Provider>
    </AuthProviders>
  </React.StrictMode>
);
