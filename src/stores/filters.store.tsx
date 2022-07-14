import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FiltersState, FiltersStatePayload, ITEMS_PER_PAGE } from '@app/models/filters.model';

export const initialState: FiltersState = {
  itemsPerPage: ITEMS_PER_PAGE,
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