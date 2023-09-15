import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
    currentUser: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push({
        id: state.users.length,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      });
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export default userSlice.reducer;

export const { addUser, setCurrentUser, logoutUser } = userSlice.actions;
