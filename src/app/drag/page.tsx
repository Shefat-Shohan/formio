"use client"
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./SortableItem"; // Custom sortable item component

const initialData = {
  name: "Beauty Product Feedback Form",
  description: "Please share your honest feedback on our latest beauty product. Your insights are valuable to us.",
  questions: [
    {
      id: "q1",
      label: "What is your overall satisfaction with the product?",
      placeholder: "Select your satisfaction level",
      fieldType: "RadioGroup",
      fieldOptions: [
        { text: "Very Satisfied", value: "very_satisfied" },
        { text: "Satisfied", value: "satisfied" },
        { text: "Neutral", value: "neutral" },
        { text: "Dissatisfied", value: "dissatisfied" },
        { text: "Very Dissatisfied", value: "very_dissatisfied" }
      ]
    },
    {
      id: "q2",
      label: "What did you like most about the product?",
      placeholder: "Enter your response here",
      fieldType: "Textarea",
      fieldOptions: []
    },
    {
      id: "q3",
      label: "Your Email (Optional)",
      placeholder: "Enter your email address",
      fieldType: "Input",
      inputType: "email",
      fieldOptions: []
    }
  ]
};

const DragAndDropForm = () => {
  const [formData, setFormData] = useState(initialData);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleDragEnd = ({ active, over }) => {
    if (active.id !== over.id) {
      const oldIndex = formData.questions.findIndex((q) => q.id === active.id);
      const newIndex = formData.questions.findIndex((q) => q.id === over.id);

      const updatedQuestions = arrayMove(formData.questions, oldIndex, newIndex);
      setFormData({ ...formData, questions: updatedQuestions });
    }
  };

  return (
    <div>
      <h1>{formData.name}</h1>
      <p>{formData.description}</p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={formData.questions.map((q) => q.id)}
          strategy={verticalListSortingStrategy}
        >
          {formData.questions.map((question) => (
            <SortableItem key={question.id} id={question.id}>
              <div style={{ padding: "16px", marginBottom: "8px", border: "1px solid #ccc", borderRadius: "4px" }}>
                <h3>{question.label}</h3>
                {question.fieldType === "RadioGroup" && (
                  <div>
                    {question.fieldOptions.map((option, idx) => (
                      <label key={idx} style={{ display: "block", margin: "4px 0" }}>
                        <input type="radio" name={question.id} value={option.value} /> {option.text}
                      </label>
                    ))}
                  </div>
                )}
                {question.fieldType === "Textarea" && (
                  <textarea placeholder={question.placeholder} style={{ width: "100%" }} />
                )}
                {question.fieldType === "Input" && (
                  <input
                    type={question.inputType || "text"}
                    placeholder={question.placeholder}
                    style={{ width: "100%" }}
                  />
                )}
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default DragAndDropForm;
