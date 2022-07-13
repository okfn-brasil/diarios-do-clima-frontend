import { FiltersState, FiltersStatePayload, ITEMS_PER_PAGE } from '@app/models/filters.model';
import type { PayloadAction } from '@reduxjs/toolkit';
// eslint-disable-next-line no-duplicate-imports
import { createSlice } from '@reduxjs/toolkit';

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
      location.reload();
    },
  },
});

export const { updateFilters, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;