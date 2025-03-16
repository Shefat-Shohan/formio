"use client";
import { useSelectedElementContext } from "@/app/context/SelectedElementContext";
import React, { useEffect, useState } from "react";
import InputField from "./settings/InputField";
import { ElementType } from "@/data/type";
import ColorPickerElement from "./settings/ColorPickerElement";
import InputTextElement from "./settings/InputTextElement";
import SliderFieldElement from "./settings/SliderFieldElement";
import TextareaElement from "./settings/TextareaElement";
import { FontWeightOption, TextAlignOption, TextTransformOption } from "@/data";
import ToggleGroupField from "./settings/ToggleGroupField";
import DropDownElement from "./settings/DropDownElement";
import ImagePreview from "./settings/ImagePreview";
import { ScrollArea } from "@/components/ui/scroll-area";

const Settings = () => {
  const { selectedElement, setSelectedElement } = useSelectedElementContext();
  const [element, setElement] = useState<ElementType>();
  useEffect(() => {
    if (selectedElement) {
      // @ts-ignore
      setElement(selectedElement?.layout?.[selectedElement?.index] ?? null);
    }
  }, [selectedElement]);

  // handle the onChange event

  const handleInputChange = (fieldName: string, value: string) => {
    if (!selectedElement) return;
    // save the current element
    const updateSelectedData = { ...selectedElement };
    // update the field
    // @ts-ignore
    updateSelectedData.layout[selectedElement.index][fieldName] = value;
    // update the original selectedElement
    setSelectedElement(updateSelectedData);
    // @ts-ignore
    /// update the setElment to keep in sync of the onChange value
    setElement(selectedElement?.layout?.[selectedElement?.index]);
  };

  /** 
   * 
  handle style changes function
   * 
  */

  const handleStyleChange = (fieldName: string, fieldValue: string) => {
    if (!selectedElement) return;

    // Create a copy of selectedElement
    let updatedElement = { ...selectedElement };

    // @ts-ignore
    // making sure layout exist

    if (!updatedElement.layout || !updatedElement.layout[selectedElement.index])
      return;

    // Update the style field inside the layout
    // @ts-ignore
    updatedElement.layout[selectedElement.index] = {
      // @ts-ignore
      ...updatedElement.layout[selectedElement.index],
      style: {
        // @ts-ignore
        ...updatedElement.layout[selectedElement.index]?.style,
        [fieldName]: fieldValue,
      },
    };

    // Update the selectedElement state
    setSelectedElement(updatedElement);

    // Update the local element state
    // @ts-ignore
    setElement(updatedElement.layout[selectedElement.index]);
  };

  // outer style function
  const handleOuterStyleChange = (fieldName: string, fieldValue: string) => {
    if (!selectedElement) return;

    // Create a copy of selectedElement
    let updatedElement = { ...selectedElement };

    // @ts-ignore
    // making sure layout exist

    if (!updatedElement.layout || !updatedElement.layout[selectedElement.index])
      return;

    // Update the style field inside the layout
    // @ts-ignore
    updatedElement.layout[selectedElement.index] = {
      // @ts-ignore
      ...updatedElement.layout[selectedElement.index],
      outerStyle: {
        // @ts-ignore
        ...updatedElement.layout[selectedElement.index]?.outerStyle,
        [fieldName]: fieldValue,
      },
    };

    // Update the selectedElement state
    setSelectedElement(updatedElement);
    // Update the local element state
    // @ts-ignore
    setElement(updatedElement.layout[selectedElement.index]);
  };

  return (
    <ScrollArea className="h-[90dvh]">
      <div className="p-5 h-full w-full min-w-[120px] lg:w-[300px]">
        <h2 className="text-xl font-bold">Style</h2>
        <div className="mt-4 flex flex-col gap-5">
          {/* show the content when it's not null or not undefined */}
          {element?.imageUrl !== null && element?.imageUrl !== undefined && (
            <ImagePreview
              value={element?.imageUrl}
              label="Upload Privew"
              handleInputChange={(value) =>
                handleInputChange("imageUrl", value)
              }
            />
          )}
          {element?.content !== null && element?.content !== undefined && (
            <InputField
              value={element?.content ?? ""}
              label={element?.label ?? ""}
              handleInputChange={(value) => handleInputChange("content", value)}
            />
          )}
          {element?.textarea !== null && element?.textarea !== undefined && (
            <TextareaElement
              value={element?.textarea ?? ""}
              label={element?.label ?? ""}
              handleInputChange={(value) =>
                handleInputChange("textarea", value)
              }
            />
          )}
          {element?.url !== null && element?.url !== undefined && (
            <InputField
              value={element?.url ?? ""}
              label="Url"
              handleInputChange={(value) => handleInputChange("url", value)}
            />
          )}
          {element?.style?.fontSize !== null &&
            element?.style?.fontSize !== undefined && (
              <InputTextElement
                value={element?.style?.fontSize}
                label="Font Size"
                handleInputChange={(value) =>
                  handleStyleChange("fontSize", value)
                }
              />
            )}
          {element?.style?.padding !== null &&
            element?.style?.padding !== undefined && (
              <InputTextElement
                value={element?.style?.padding}
                label="Padding"
                handleInputChange={(value) =>
                  handleStyleChange("padding", value)
                }
              />
            )}
          {element?.style?.textAlign !== null &&
            element?.style?.textAlign !== undefined && (
              <ToggleGroupField
                value={element?.style?.textAlign}
                label="Text Align"
                options={TextAlignOption}
                handleInputChange={(value) =>
                  handleStyleChange("textAlign", value)
                }
              />
            )}
          {element?.style?.textTransform !== null &&
            element?.style?.textTransform !== undefined && (
              <ToggleGroupField
                value={element?.style?.textTransform}
                label="Text Transform"
                options={TextTransformOption}
                handleInputChange={(value) =>
                  handleStyleChange("textTransform", value)
                }
              />
            )}
          {element?.style?.fontWeight !== null &&
            element?.style?.fontWeight !== undefined && (
              <DropDownElement
                value={element?.style?.fontWeight}
                label="Font Weight"
                options={FontWeightOption}
                handleInputChange={(value) =>
                  handleStyleChange("fontWeight", value)
                }
              />
            )}
          {element?.style?.borderRadius !== null &&
            element?.style?.borderRadius !== undefined && (
              <SliderFieldElement
                value={element?.style?.borderRadius}
                label="Border Radius"
                handleInputChange={(value) =>
                  handleStyleChange("borderRadius", value)
                }
              />
            )}
          {element?.style?.width !== null &&
            element?.style?.width !== undefined && (
              <SliderFieldElement
                value={element?.style?.width}
                label="Width"
                type="%"
                handleInputChange={(value) => handleStyleChange("width", value)}
              />
            )}
          {element?.style?.backgroundColor !== null &&
            element?.style?.backgroundColor !== undefined && (
              <ColorPickerElement
                value={element?.style?.backgroundColor}
                label="Background Color"
                handleStyleChange={(value) =>
                  handleStyleChange("backgroundColor", value)
                }
              />
            )}

          {element?.style?.color !== null &&
            element?.style?.color !== undefined && (
              <ColorPickerElement
                value={element?.style?.color}
                label="Text Color"
                handleStyleChange={(value) => handleStyleChange("color", value)}
              />
            )}
          <div>
            <span className="text-xl font-bold">Outer Style</span>
            {element?.outerStyle?.backgroundColor !== null &&
              element?.outerStyle?.backgroundColor !== undefined && (
                <ColorPickerElement
                  value={element?.outerStyle?.backgroundColor}
                  label="Background Color"
                  handleStyleChange={(value) =>
                    handleOuterStyleChange("backgroundColor", value)
                  }
                />
              )}
            {element?.outerStyle?.justifyContent !== null &&
              element?.outerStyle?.justifyContent !== undefined && (
                <ToggleGroupField
                  value={element?.outerStyle?.justifyContent}
                  label="Align Item"
                  options={TextAlignOption}
                  handleInputChange={(value) =>
                    handleStyleChange("justifyContent", value)
                  }
                />
              )}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Settings;
