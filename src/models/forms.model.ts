export interface InputModel {
  value: string;
  isValid?: boolean;
  errorMessage?: string;
}

export interface InputElModel {
  target: {
    name: string;
    value: string;
    checked: boolean;
  }
}