import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

interface FormFieldWrapperProps {
  label: string;
  error?: boolean;
  children: React.ReactNode;
}

export const FormFieldWrapper = ({ label, error, children }: FormFieldWrapperProps) => (
  <FormItem>
    <FormLabel
      className={`text-base font-normal leading-tight ${
        error ? "text-red-500" : "text-[#272728]"
      }`}
    >
      {label}
    </FormLabel>
    <FormControl>{children}</FormControl>
    <FormMessage className="text-red-500" />
  </FormItem>
); 