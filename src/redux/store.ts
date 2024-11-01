import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./reducers/menuReducer";

const store = configureStore({
  reducer: {
    menu: menuReducer,
  },
});

// Declare Typed Definitions
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
