import { FiltersStatePayload, ModalFilters } from '@app/models/filters.model';

export const checkKeyWords = (value: string) => {
  const keywordsSplited = (value || '').split(';');
  return !(keywordsSplited.length > 5);
}

export const checkFiltersValidity = (filters: ModalFilters) => {
  return !!(filters && (filters.ente || filters.location || (filters.themes && filters.themes.length)))
}

export const initialFilters: FiltersStatePayload = {
  location: '0',
  ente: '0',
};