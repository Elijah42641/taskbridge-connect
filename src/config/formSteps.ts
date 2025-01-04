import { FormData, FormStep } from "@/types/form";
import { isValidEmail } from "@/utils/formValidation";
import { toast } from "@/components/ui/use-toast";

export const getFormSteps = (): FormStep[] => [
  {
    title: "Basic Information",
    description: "Let's start with your account details",
    fields: ["fullName", "email", "password"],
    validate: (formData: FormData) => {
      if (!isValidEmail(formData.email)) {
        toast({
          title: "Invalid Email",
          description: "Please enter a valid email address",
          variant: "destructive",
        });
        return false;
      }
      return true;
    },
  },
  {
    title: "Choose Your Goal",
    description: "Tell us what brings you to TaskIQ",
    fields: ["goal"],
  },
  {
    title: "Location",
    description: "Help us connect you with your local community",
    fields: ["location"],
  },
  {
    title: "Contact Information",
    description: "Add your phone number for verification",
    fields: ["phone"],
  },
  {
    title: "Verify Your Phone",
    description: "Enter the code we sent to your phone",
    fields: ["verificationCode"],
  },
];