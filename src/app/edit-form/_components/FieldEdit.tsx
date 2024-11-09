import { Delete, Edit, Trash, X } from "lucide-react";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type defaultValueProps = {
  label: string;
  placeholder: string;
  fieldType: string;
  fieldOptions: [];
};

export default function FieldEdit({
  defaultValue,
  onUpdate,
  deleteField,
}: {
  defaultValue: defaultValueProps;
  onUpdate: (value: { label: string; placeholder: string }) => void;
  deleteField: () => void;
}) {
  const [label, setLabel] = useState(defaultValue.label);
  const [placeholder, setPlaceholder] = useState(defaultValue.placeholder);
  return (
    <div className="flex gap-2">
      <div>
        <Popover>
          <PopoverTrigger>
            <Edit className="size-4 text-gray-300" />
          </PopoverTrigger>
          <PopoverContent>
            <h2 className="font-semibold my-2">Edit fields</h2>
            <div className="flex flex-col gap-4">
              <div>
                <Label className="text-xs">Label Name</Label>
                <Input
                  className="mt-2"
                  type="text"
                  defaultValue={defaultValue.label}
                  onChange={(e) => setLabel(e.target.value)}
                />
              </div>
              <div>
                <Label className="text-xs">Placeholder name</Label>
                <Input
                  type="text"
                  className="mt-2"
                  defaultValue={defaultValue.placeholder}
                  onChange={(e) => setPlaceholder(e.target.value)}
                />
              </div>
              <Button
                size="sm"
                onClick={() =>
                  onUpdate({
                    label: label,
                    placeholder: placeholder,
                  })
                }
              >
                Update
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <AlertDialog>
          <AlertDialogTrigger>
            <Trash className="size-4 text-red-500" />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-black border-white/15">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-white/70">
                This action cannot be undone. This will permanently delete the
                field and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="text-white/70 px-6 py-2 font-normal bg-transparent border border-white/15 hover:bg-transparent hover:text-white/70">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="px-6 py-2 bg-red-500 hover:bg-red-600"
                onClick={() => deleteField()}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
