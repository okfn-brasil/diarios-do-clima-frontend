import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  access?: string | null;
  refresh?: string | null;
  full_name?: string | null;
  gender?: string | null;
  id?: string | null;
  plan_pro?: boolean | null;
}

const initialState: userState = {
  access: localStorage.getItem('tk') || null,
  refresh: localStorage.getItem('rh') || null,
  full_name: null,
  gender: null,
  id: null,
  plan_pro: null,
};

export const userSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    userUpdate: (state, action: PayloadAction<userState>) => {
      Object.assign(state, action.payload);
      if(action.payload.access) {
        localStorage.setItem('tk', action.payload.access as string);
        localStorage.setItem('rh', action.payload.refresh as string);
      }
    },
    userReset: (state) => {
      state = initialState;
      localStorage.removeItem('tk');
      localStorage.removeItem('rh');
    },
  },
});

export const { userUpdate, userReset } = userSlice.actions;

export default userSlice.reducer;