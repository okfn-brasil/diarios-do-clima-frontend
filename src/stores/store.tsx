import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user.store';
import filtersReducer from './filters.store';

export const store = configureStore({
  reducer: {
    user: userReducer,
    filter: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;