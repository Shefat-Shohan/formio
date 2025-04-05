import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import FieldEdit from "./FieldEdit";
import { useForm, Controller } from "react-hook-form";
import { db } from "../../../../configs";
import { userResponses } from "../../../../configs/schema";
import { toast } from "sonner";
import { usePathname, useRouter } from "next/navigation";
import { JsonFormType } from "@/data/type";
import FormSkeleton from "@/app/email-editor/[formId]/_components/FormSkeleton";
import { log } from "console";
const FormUi = ({
  jsonForm,
  loading,
  onFieldUpdate,
  deleteField,
  editable = true,
  formId,
}: {
  jsonForm: JsonFormType[];
  formId?: Number;
  loading: boolean;
  editable?: boolean;
  onFieldUpdate?: any;
  deleteField?: any;
}) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {},
  });
  const path = usePathname();
  const isEditForm = path.startsWith("/edit-form");
  const router = useRouter();
  let moment = require("moment");

  // submit the  form to database
  const formSubmit = async (data: any) => {
    try {
      // @ts-ignore
      const result = await db.insert(userResponses).values({
        jsonResponse: data,
        createAt: moment().format("DD/MM/YYYY"),
        formRef: formId,
        status: 0,
      });
      if (result) {
        router.push(`/aiform/${formId}/success`);
        reset();
      } else {
        toast("No response recorded, something went wrong");
      }
    } catch (error) {
      toast("Responses failed");
      console.error("Failed to submit the response", error);
    }
  };

  return (
    <div className="lg:p-10 p-6 rounded-lg bg-[#171717] border border-white/15">
      <form onSubmit={handleSubmit(formSubmit)} className="w-full">
        <div>
          <h1 className="font-bold md:text-3xl text-2xl text-white mb-1">
            {/*@ts-ignore */}
            {jsonForm.name}
          </h1>
          <p className="text-sm text-white/50 leading-[28px]">
            {/*@ts-ignore */}
            {jsonForm.description}
          </p>
        </div>
        {loading ? (
          <div className="mt-10">
            <FormSkeleton />
          </div>
        ) : (
          <div className="mt-8">
            {
              // @ts-ignore
              jsonForm?.questions?.map((field, index) => (
                <div key={index} className="my-6">
                  <div className="flex flex-row justify-between md:items-center mb-2">
                    <Label className="text-white/70">{field.label}</Label>
                    {editable && (
                      <FieldEdit
                        defaultValue={field}
                        onUpdate={(value) => onFieldUpdate(value, index)}
                        deleteField={() => deleteField(index)}
                      />
                    )}
                  </div>
                  {field.fieldType === "Select" ? (
                    <Controller
                      // @ts-ignore
                      name={field.label}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select onValueChange={onChange} value={value} required>
                          <SelectTrigger className="placeholder:text-white/50  placeholder:text-sm text-white/70 bg-transparent border-white/15 mt-2">
                            <SelectValue
                              placeholder={
                                field.placeholder || "Select a option"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="placeholder:text-white/50 placeholder:text-sm text-white/70 bg-[#212121] border-white/15">
                            {field?.fieldOptions.map(
                              (option: any, index: number) => (
                                <SelectItem key={index} value={option.value}>
                                  {option.text}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  ) : field.fieldType === "RadioGroup" ? (
                    <Controller
                      // @ts-ignore
                      name={field.label}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className=" flex flex-col gap-3 lg:flex-row md:gap-6">
                          {field?.fieldOptions.map(
                            (option: any, index: number) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 mt-2"
                              >
                                <Input
                                  required
                                  type="radio"
                                  id={option.value}
                                  value={option.value}
                                  checked={value === option.value}
                                  onChange={() => onChange(option.value)}
                                  className="size-4"
                                />
                                <Label
                                  htmlFor={option.value}
                                  className="text-white/70"
                                >
                                  {option.value}
                                </Label>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    />
                  ) : field.fieldType === "Textarea" ? (
                    <Controller
                      // @ts-ignore
                      name={field.label}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Textarea
                          required
                          placeholder={field.placeholder}
                          className="placeholder:text-white/50 placeholder:text-sm text-white/70 bg-transparent border-white/15 max-h-40 mt-2"
                          onChange={onChange}
                          value={value}
                        />
                      )}
                    />
                  ) : field.fieldType === "Switch" ? (
                    <Controller
                      // @ts-ignore
                      name={field.label}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <div className="flex items-center gap-2">
                          <Checkbox
                            required
                            id={field.label}
                            checked={value}
                            onCheckedChange={onChange}
                            className="border border-white/15 bg-transparent"
                          />
                          <label
                            htmlFor={field.label}
                            className="text-white/70"
                          >
                            {field.label}
                          </label>
                        </div>
                      )}
                    />
                  ) : (
                    <Controller
                      // @ts-ignore
                      name={field.label}
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          required
                          onChange={onChange}
                          value={value}
                          className="placeholder:text-white/50 placeholder:text-sm text-white/70 border border-white/15 bg-transparent mt-2"
                          type={field.inputType}
                          placeholder={field.placeholder}
                        />
                      )}
                    />
                  )}
                </div>
              ))
            }
            <Button
              disabled={isSubmitting || isEditForm}
              className="bg-[#8A43FC] hover:bg-[#5A28AB] px-8 py-2"
              type="submit"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormUi;
