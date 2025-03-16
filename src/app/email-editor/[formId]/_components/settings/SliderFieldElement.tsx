import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type SliderFieldProps = {
  label: string;
  value: string;
  handleInputChange: (value: string) => void;
  type?: string;
};

const SliderFieldElement = ({
  label,
  value,
  handleInputChange,
  type = "px",
}: SliderFieldProps) => {
  const formatValue = (value: string) => {
    return parseInt(value.replace(type, " "));
  };
  return (
    <div>
      <Label>
        {label} ({value})
      </Label>
      <Slider
        className="mt-1.5"
        defaultValue={[formatValue(value)]}
        max={100}
        step={1}
        onValueChange={(e: number[]) => handleInputChange(`${e[0]}${type}`)}
      />
    </div>
  );
};

export default SliderFieldElement;
