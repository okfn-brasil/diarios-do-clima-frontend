import { removeSpecialChars } from "./functions.utils";

export const homePhoneMask = '(99) 9999-99999';
export const mobilePhoneMask = '(99) 99999-9999';

export const getInputWithoutMask = (value: string) => {
  const newValue = removeSpecialChars(value);
  return newValue;
};

export const inputValidation = (value: string, size: number, text: string, isMax = false) => {
  return value && (isMax ? getInputWithoutMask(value).length > size :  getInputWithoutMask(value).length < size) ? text : false;
};
