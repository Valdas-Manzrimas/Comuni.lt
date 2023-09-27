// store/features/userSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
    accessToken: null,
    userPreferences: {
      theme: 'light',
      language: 'en',
    },
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: state.users.length,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        token: action.payload.token,
      });
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    setTheme: (state, action) => {
      state.userPreferences.theme = action.payload;
    },
    setLanguage: (state, action) => {
      state.userPreferences.language = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  addUser,
  setCurrentUser,
  setAccessToken,
  logoutUser,
  setTheme,
  setLanguage,
  rehydrateUser,
} = userSlice.actions;
