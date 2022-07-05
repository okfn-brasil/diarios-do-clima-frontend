import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { tokenKeys, deleteTokens } from '../ui/utils/storage-utils';

export interface UserState {
  access?: string | null;
  refresh?: string | null;
  full_name?: string | null;
  id?: string | null;
  plan_pro?: boolean | null;
}

const initialState: UserState = {
  access: localStorage.getItem(tokenKeys.access) || null,
  refresh: localStorage.getItem(tokenKeys.refresh) || null,
  full_name: null,
  id: null,
  plan_pro: null,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    userUpdate: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
      if(action.payload.access) {
        localStorage.setItem(tokenKeys.access, action.payload.access as string);
        localStorage.setItem(tokenKeys.refresh, action.payload.refresh as string);
      }
    },
    userReset: (state) => {
      deleteTokens();
      state = Object.assign(state, initialState);;
    },
  },
});

export const { userUpdate, userReset } = userSlice.actions;

export default userSlice.reducer;