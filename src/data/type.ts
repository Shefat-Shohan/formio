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
  background: string | null;
  createAt: Date;
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
  background: string | null;
  createAt: Date;
  createBy: string;
  id: Number;
  jsonForm: string;
  style: string | null;
}[];
