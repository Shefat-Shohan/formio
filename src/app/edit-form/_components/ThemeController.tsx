import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GradientBG } from "./_theme-data/Gradient";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Span } from "next/dist/trace";

export default function ThemeController({ selectedBackground }:any) {
  const [showmore, setShowMOre] = useState(6);
  return (
    <div>
      <div className="flex md:flex-row flex-col gap-4 items-start md:items-center">
        <h2 className="mb-4 md:mb-0 whitespace-nowrap">Select theme</h2>

        <Select>
          <SelectTrigger className="w-full bg-transparent border-white/15">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-white/15 text-white">
            <SelectItem value="light">Light</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mt-10 grid grid-cols-3  gap-6">
          {GradientBG.map(
            (bg, index) =>
              index < showmore && (
                <div
                  onClick={() => selectedBackground(bg.gradient)}
                  key={index}
                  className="w-full h-[70px] rounded-lg hover:scale-105 hover:transition-all hover:duration-300 flex items-center justify-center cursor-pointer"
                  style={{ background: bg.gradient }}
                >
                  {index == 0 && (
                    <span className="border border-white/15 w-full h-full rounded-lg inline-flex items-center justify-center">
                      None
                    </span>
                  )}
                </div>
              )
          )}
        </div>
      </div>
      <Button
        onClick={() => setShowMOre(showmore > 6 ? 6 : GradientBG.length)}
        variant="ghost"
        className="w-full mt-6"
      >
        Show more
      </Button>
      <h2 className="my-10 font-semibold">Add new form field</h2>
    </div>
  );
}
