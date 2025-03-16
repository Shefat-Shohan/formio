import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputTextFieldProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
  type?: string;
};

const InputTextElement = ({
  label,
  value,
  handleInputChange,
  type = "px",
}: InputTextFieldProps) => {
  
  // remove the string and return a number.
  const formatValue = (value: string) => {
    return value.replace(type, "");
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          className="placeholder:text-text-white bg-[#171717] border-white/15 mt-1.5"
          placeholder="Add text here"
          value={formatValue(value)}
          onChange={(e) => handleInputChange(e.target.value + type)}
        />
        <span>{type}</span>
      </div>
    </div>
  );
};

export default InputTextElement;
