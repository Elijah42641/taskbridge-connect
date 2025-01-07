import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

interface BasicInformationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInformationStep = ({ formData, onInputChange }: BasicInformationStepProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base font-medium text-gray-700">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onInputChange}
          className="input-field hover-lift"
          placeholder="John Doe"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium text-gray-700">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onInputChange}
          className="input-field hover-lift"
          placeholder="john@example.com"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-base font-medium text-gray-700">
          Password
        </Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={onInputChange}
          className="input-field hover-lift"
          placeholder="••••••••"
        />
        <p className="text-sm text-muted-foreground mt-1">
          Must be at least 8 characters long
        </p>
      </div>
    </div>
  );
};