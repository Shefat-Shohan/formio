import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
type Option = {
  value: string;
  icon?: React.ElementType;
};

type ToggleGroupProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
  options: Option[];
};

const DropDownElement = ({
  label,
  value,
  options,
  handleInputChange,
}: ToggleGroupProps) => {
  return (
    <div>
      <Label htmlFor="">{label}</Label>
      <Select defaultValue={value} onValueChange={(v) => handleInputChange(v)}>
        <SelectTrigger className="w-full bg-transparent text-white border-white/15 outline-none mt-1.5">
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent className="bg-[#212121] text-white border-white/15">
          {options.map((option, index) => (
            <SelectItem className="w-full" key={index} value={option.value}>
              {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default DropDownElement;
