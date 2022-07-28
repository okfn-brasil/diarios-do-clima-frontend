import { UserState } from '@app/models/user.model';
import { deleteTokens, tokenKeys } from '@app/ui/utils/storage-utils';
import type { PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line no-duplicate-imports
import { createSlice } from '@reduxjs/toolkit';

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
      Object.assign(state, {...action.payload, plan_pro: checkPlan(action.payload)});
      if(action.payload.access) {
        localStorage.setItem(tokenKeys.access, action.payload.access as string);
        localStorage.setItem(tokenKeys.refresh, action.payload.refresh as string);
      }
    },
    userReset: (state) => {
      deleteTokens();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
      location.reload();
    },
  },
});

export const { userUpdate, userReset } = userSlice.actions;

export default userSlice.reducer;

const checkPlan = (userData: UserState) => {
  return userData.plan_subscription && userData.plan_subscription.plan ?
    userData.plan_subscription.plan.pagseguro_plan_id : null;
};