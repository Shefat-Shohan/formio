import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TimerReset } from "lucide-react";

type Props = {
  value: string;
  label: string;
  handleStyleChange: (value: string) => void;
};

const ColorPickerElement = ({ value, label, handleStyleChange }: Props) => {
  return (
    <div className="flex gap-4 items-center justify-between">
      <Label className="whitespace-nowrap">{label}</Label>
      <div className="flex items-center gap-2">
        <TimerReset
          className="size-4 cursor-pointer"
          onClick={() => handleStyleChange(" ")}
        />
        <Input
          style={{ background: "none" }}
          className="mt-1.5 p-0  w-10 h-10 cursor-pointer border-none"
          type="color"
          value={value}
          onChange={(e) => handleStyleChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default ColorPickerElement;
