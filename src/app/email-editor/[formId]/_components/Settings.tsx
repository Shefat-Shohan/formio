"use client";
import { useSelectedElementContext } from "@/app/context/SelectedElementContext";
import React, { useEffect, useState } from "react";
import InputField from "./settings/InputField";

type Props = {};

const Settings = (props: Props) => {
  const { selectedElement, setSelectedElement } = useSelectedElementContext();
  const [element, setElement] = useState();

  console.log(element?.content);
  useEffect(() => {
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  }, [selectedElement]);

  // hndle the onChange event

  const handleInputChange = (fieldName: string, value: string) => {
    // save the current element
    const updateSelectedData = { ...selectedElement };
    // update the field
    updateSelectedData.layout[selectedElement.index][fieldName] = value;
    // update the original selectedElement
    setSelectedElement(updateSelectedData);
  };
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold">Settings</h2>
      <div className="mt-4">
        {element?.content && (
          <InputField
            value={element?.content}
            label={`Content`}
            handleInputChange={(value) => handleInputChange("Content", value)}
          />
        )}
      </div>
    </div>
  );
};

export default Settings;
