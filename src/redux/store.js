import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducers/themeReducer";
import userReducer from "./reducers/userReducer"; // Already added
import chatReducer from "./reducers/chatReducer";
import messageReducer from "./reducers/messageReducer";
import notificationsReducer from "./reducers/notificationReducer";

// Combine all the reducers
const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  chat: chatReducer,
  messages: messageReducer,
  notifications: notificationsReducer
});

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer
});

export default store;
