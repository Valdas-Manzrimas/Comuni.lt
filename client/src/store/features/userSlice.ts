import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UserState {
  users: User[];
}

const initialState: UserState = {
  users: [],
};

export const UserSlice = createSlice({
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
  },
});

export default UserSlice.reducer;
export const { addUser } = UserSlice.actions;
