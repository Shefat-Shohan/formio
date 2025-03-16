import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type InputTextFieldProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
  type?: string;
};

const TextareaElement = ({
  label,
  value,
  handleInputChange,
}: InputTextFieldProps) => {
  return (
    <div className="w-full">
      <Label>{label}</Label>
      <Textarea
        className="mt-1.5 border-white/15 bg-transparent"
        value={value}
        onChange={(e) => handleInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextareaElement;
