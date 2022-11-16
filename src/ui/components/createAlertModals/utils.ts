import { FiltersStatePayload, ModalFilters } from '@app/models/filters.model';

export const checkKeyWords = (value: string) => {
  const keywordsSplited = (value || '').split(';');
  return !(keywordsSplited.length > 5);
}

export const checkFiltersValidity = (filters: ModalFilters) => {
  return !!(filters && (filters.ente || filters.territory_id || (filters.themes && filters.themes.length)))
}

export const initialFilters: FiltersStatePayload = {
  territory_id: '0',
  ente: '0',
};