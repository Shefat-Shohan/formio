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

// email template types
export type ElementLayoutProps = {
  id?: number;
  label: string;
  type: string;
  numberOfCol: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export interface ElementStyle {
  textAlign?: string;
  backgroundColor?: string;
  color?: string;
  padding?: string;
  width?: string | number;
  height?: string | number;
  imageUrl?: string;
  margin?: string;
  fontSize?: string;
  borderRadius?: string;
  fontWeight?: string;
  objectFit?: string;
  textTransform?: string;
}

export interface ElementOuterStyle {
  display?: string;
  backgroundColor?: string;
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  gap?: number;
}

export interface ElementsListProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  type:
    | "Button"
    | "Text"
    | "Image"
    | "Logo"
    | "LogoHeader"
    | "Divider"
    | "SocialIcons";
  content: string;
  url: string;
  style: ElementStyle;
  outerStyle: ElementOuterStyle;
}
