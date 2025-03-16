import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputFieldProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
};

const InputField = ({ label, value, handleInputChange }: InputFieldProps) => {
  return (
    <div>
      <Label>{label}</Label>
      <Input
        className="placeholder:text-text-white bg-[#171717] border-white/15 mt-1.5"
        placeholder="Add text here"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
