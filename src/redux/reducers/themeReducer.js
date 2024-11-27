import { createSlice } from "@reduxjs/toolkit";

let darkMode = JSON.parse(localStorage.getItem("darkMode"));

if (typeof darkMode !== "boolean") {
  darkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
}

document.documentElement.setAttribute(
  "data-theme",
  darkMode ? "dark" : "light"
);
const initialState = {
  darkMode
};

localStorage.setItem("darkMode", JSON.stringify(darkMode));

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
      document.documentElement.setAttribute(
        "data-theme",
        state.darkMode ? "dark" : "light"
      );
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    }
  }
});

export const { toggleDarkMode } = themeSlice.actions;

export default themeSlice.reducer;
