"use client";

import { Type } from "lucide-react";
import { ElementsType, FormElement } from "../FormElements";

const type: ElementsType = "TextField";
export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {
      label: "Text field",
      helperText: "Helper text",
      required: false,
      placeholder: "Value here...",
    },
  }),
  designerBtnElement: {
    icon: Type,
    label: "Text Field"
  },
  designerComponent: () => <div>Designer component</div>,
  formComponent: () => <div>form component</div>,
  propertiesComponent: () => <div>Properties component</div>,
};
