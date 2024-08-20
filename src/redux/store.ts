import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice.js";
import postSlice from "./postSlice.js";
// import socketSlice from "./socketSlice.js"
// import chatSlice from "./chatSlice.js";
// import rtnSlice from "./rtnSlice.js";

import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authSlice,
  post: postSlice,
  // socketio:socketSlice,
  // chat:chatSlice,
  // realTimeNotification:rtnSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch;

// Export the `RootState` type as well
export type RootState = ReturnType<typeof store.getState>;

export default store;
