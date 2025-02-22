import { Input } from "@/components/ui/input";
import React from "react";

type InputFieldProps = {
  label: string;
  value: string;
  handleInputChange: (e) => void;
};

const InputField = ({ label, value, handleInputChange }: InputFieldProps) => {
  return (
    <div>
      <label>{label}</label>
      <Input
        className="placeholder:text-black bg-[#171717] border-white/15 mt-1.5"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
