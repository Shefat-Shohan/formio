import { Interface } from "readline";

export type FormListType = {
  createAt: string;
  createdBy: string;
  id: Number;
  background: string | null;
  jsonForm: string;
}[];

export type ResultType = {
  jsonResponse: string;
  id: number;
  createBy: string | null;
  createAt: string;
  formRef: number | null;
}[];

export interface jsonFormType {
  description: string;
  name: string;
  questions: Questions[];
}
export interface Questions {
  label: string;
  placeholder: string;
  fieldType: string;
  inputType: string;
  fieldOptions: FieldOptionType;
}
[];

export interface FieldOptionType {
  text: string;
  value: string;
}
[];
