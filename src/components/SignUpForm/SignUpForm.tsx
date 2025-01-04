import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StepIndicator } from "./StepIndicator";
import { FormStep } from "./FormStep";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { VerificationStep } from "./VerificationStep";
import { BasicInformationStep } from "./steps/BasicInformationStep";
import { GoalSelectionStep } from "./steps/GoalSelectionStep";
import { LocationStep } from "./steps/LocationStep";
import { ContactStep } from "./steps/ContactStep";
import { FormData } from "@/types/form";
import { getFormSteps } from "@/config/formSteps";
import { validateRequiredFields } from "@/utils/formValidation";

export const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    password: "",
    goal: "",
    location: "",
    phone: "",
    verificationCode: "",
  });

  const steps = getFormSteps();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const currentFields = steps[currentStep].fields;
    const isValid = validateRequiredFields(formData, currentFields);

    if (!isValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    if (steps[currentStep].validate && !steps[currentStep].validate(formData)) {
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      toast({
        title: "Success!",
        description: "Your account has been created",
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <BasicInformationStep formData={formData} onInputChange={handleInputChange} />;
      case 1:
        return <GoalSelectionStep formData={formData} setFormData={setFormData} />;
      case 2:
        return <LocationStep formData={formData} onInputChange={handleInputChange} />;
      case 3:
        return <ContactStep formData={formData} onInputChange={handleInputChange} />;
      case 4:
        return <VerificationStep phone={formData.phone} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-50 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <StepIndicator currentStep={currentStep} totalSteps={steps.length} />
          <AnimatePresence mode="wait">
            <FormStep
              key={currentStep}
              title={steps[currentStep].title}
              description={steps[currentStep].description}
            >
              {renderStepContent(currentStep)}
            </FormStep>
          </AnimatePresence>
          <div className="mt-8 flex justify-between">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              Back
            </Button>
            <Button onClick={handleNext}>
              {currentStep === steps.length - 1 ? "Complete" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};