import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface FiltersStatePayload {
  itemsPerPage?: number;
  query?: string;
  order?: string;
}

export interface FiltersState {
  itemsPerPage: number;
  query?: string;
  order?: string;
}

const initialState: FiltersState = {
  itemsPerPage: 6,
  order: 'recente',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    updateFilters: (state, action: PayloadAction<FiltersStatePayload>) => {
      Object.assign(state, action.payload);
    },
    resetFilters: (state) => {
      state = initialState;
      location.reload();
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;