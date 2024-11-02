export type responseType = {
  createAt: string;
  createBy: string | null;
  formRef: Number | null;
  id: Number;
  jsonResponse: string;
}[];

export type jsonFormCardType = {
  name: string;
  description: string;
  id: number;
};
export type formRecordType = {
  background: string | undefined;
  createAt: Date | null;
  createBy: string;
  id: Number;
  jsonForm: string;
  style: string | null;
}[];

export interface jsonFormProps {
  jsonForm: jsonFormCardType;
  formRecord: formRecordType;
  refreshData: () => void;
}

export type formListType = {
  background: string | undefined;
  createAt: Date | null;
  createBy: string;
  id: number;
  jsonForm: string;
  style: string | null;
}[];

export type jsonRecordType = {
  background: string | undefined;
  createAt: Date | null;
  createBy: string;
  id: number;
  jsonForm: string;
  style: string | null;
};

export type FieldOptionType = {
  text: string;
  value: string;
};

export type QuestionType = {
  label: string;
  placeholder?: string;
  fieldType: "Input" | "RadioGroup" | "Select" | "Textarea" | "Switch"; // restrict to possible values
  inputType?: "text" | "email" | "tel" | "date"; // optional and restricted to specific input types
  fieldOptions?: FieldOptionType[]; // optional array of field options
};

export type JsonFormType = {
  name: string;
  description: string;
  questions: QuestionType[];
}[];
