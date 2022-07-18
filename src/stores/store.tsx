import { configureStore } from '@reduxjs/toolkit';

import filtersReducer from '@app/stores/filters.store';
import userReducer from '@app/stores/user.store';

export const store = configureStore({
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
    filter: filtersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;