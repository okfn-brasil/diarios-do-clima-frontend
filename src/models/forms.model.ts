import { SelectChangeEvent } from '@mui/material';
import { ChangeEvent } from 'react';

export interface InputModel {
  value: string;
  isValid?: boolean;
  errorMessage?: string;
}

export interface CheckBoxesModel {
  [key: string]: boolean | null;
}

export interface FieldValidation {
  [key: string]: (value: string) => boolean | string;
}

export interface ValidationInputModel {
  [key: string]: (s: InputModel) => string | boolean | undefined;
}

export type InputType =  ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>;