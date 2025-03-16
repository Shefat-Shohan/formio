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
  style: {
    backgroundColor?: string;
    padding?: string;
    width?: string | number;
    height?: string | number;
    margin?: string;
    borderRadius?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
    textTransform?: string;
    color?: string;
    objectFit?: string;
  };
  outerStyle: {
    display: string;
    width?: string | number;
    justifyContent: string;
    alignItems: string;
    backgroundColor: string;
  };
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
  index?: number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  type:
    | "Button"
    | "Text"
    | "Paragraph"
    | "Image"
    | "Logo"
    | "LogoHeader"
    | "Divider"
    | "SocialIcons";
  content: string;
  textarea: string;
  url: string;
  style: ElementStyle;
  outerStyle: ElementOuterStyle;
}

export type ElementType = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  id: number;
  label: string;
  type: string;
  content: string;
  textarea: string;
  imageUrl: string;
  url: string;
  style: {
    backgroundColor?: string;
    padding?: string;
    width?: string;
    height?: string;
    borderRadius?: string;
    textAlign?: string;
    fontSize?: string;
    fontWeight?: string;
    textTransform?: string;
    color?: string;
    objectFit?: string;
  };
  outerStyle: {
    display: string;
    width?: string;
    justifyContent: string;
    alignItems: string;
    backgroundColor: string;
  };
};

export type Option = {
  value: string;
  icon: React.ElementType;
};

export type SentimentType = {
  formRef: number;
  id: number;
  isProcessing: boolean;
  sentimentResponse: string;
};

export type parsedBackSentimentType = {
  emails: [];
  formRef: number;
  overview: string;
  recommendations: string;
  sentiment: string;
};

export type EmailCampaignType = {
  id: number;
  assignedCustomer: [] | null;
  createdAt: string;
  createdBy: string;
  emailTemplate: string | null;
  formRef: number;
  title: string;
};
