import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { StepIndicator } from "./StepIndicator";
import { FormStep } from "./FormStep";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { VerificationStep } from "./VerificationStep";

export const SignUpForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    goal: "",
    location: "",
    phone: "",
    verificationCode: "",
  });

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with your account details",
      fields: ["fullName", "email", "password"],
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    const currentFields = steps[currentStep].fields;
    const isValid = currentFields.every((field) => formData[field]?.trim());

    if (!isValid) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
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
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="input-field"
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="input-field"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
                placeholder="••••••••"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {["Rent gear or services", "Offer gear or services", "Both"].map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, goal: option }))
                    }
                    className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                      formData.goal === option
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <div className="font-medium">{option}</div>
                  </button>
                )
              )}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="location">Your Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="input-field"
                placeholder="Enter your city"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="input-field"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>
        );
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