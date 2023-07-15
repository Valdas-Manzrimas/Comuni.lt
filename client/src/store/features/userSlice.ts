import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface UserState {
  users: User[];
  currentUser: User | null;
}

const initialState: UserState = {
  users: [],
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (
      state,
      action: PayloadAction<{
        firstName: string;
        lastName: string;
        email: string;
      }>
    ) => {
      state.users.push({
        id: state.users.length,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
      });
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
  },
});

export default userSlice.reducer;
export const { addUser, setCurrentUser, logoutUser } = userSlice.actions;

export type UserSliceActionTypes = ReturnType<
  (typeof userSlice.actions)[keyof typeof userSlice.actions]
>;
