import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

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

const ToggleGroupField = ({
  label,
  value,
  options,
  handleInputChange,
}: ToggleGroupProps) => {
  return (
    <div className="">
      <Label>{label}</Label>
      <ToggleGroup
        className="mt-3"
        type="single"
        defaultValue={value}
        onValueChange={(value) => value && handleInputChange(value)}
      >
        {options.map((option, index) => (
          <ToggleGroupItem className="w-full" key={index} value={option.value}>
            {option.icon && <option.icon />}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupField;
