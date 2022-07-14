import { FiltersStatePayload, ModalFilters } from "@app/models/filters.model";
import { themesMock } from "@app/ui/utils/mocks";

export const checkKeyWords = (value: string) => {
  const keywordsSplited = (value || '').split(';');
  return !(keywordsSplited.length > 5);
}

export const parseQuery = (value: string) => {
  let newQuery = value;
  if(newQuery && !checkKeyWords(newQuery)) {
    newQuery = newQuery.split(';').slice(0, 5).join(';');
  }
  return newQuery || '';
}

export const checkFiltersValidity = (filters: ModalFilters) => {
  return !!(filters && (filters.ente || filters.location || (filters.themes && filters.themes.length)))
}

export const initialFilters: FiltersStatePayload = {
  location: '0',
  ente: '0',
  themes: themesMock,
};