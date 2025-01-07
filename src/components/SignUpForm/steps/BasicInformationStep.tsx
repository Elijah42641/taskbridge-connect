import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

interface BasicInformationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BasicInformationStep = ({ formData, onInputChange }: BasicInformationStepProps) => {
  const getCharacterCount = (value: string) => {
    return `${value.length}/50`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, maxLength } = e.target;
    if (maxLength && value.length <= maxLength) {
      onInputChange(e);
    } else if (!maxLength) {
      onInputChange(e);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="fullName" className="text-base font-medium text-gray-700">
          Full Name
        </Label>
        <div className="relative">
          <Input
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="input-field hover-lift pr-16"
            placeholder="John Doe"
            minLength={2}
            maxLength={50}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {getCharacterCount(formData.fullName)}
          </span>
        </div>
        {formData.fullName && formData.fullName.length < 2 && (
          <p className="text-sm text-red-500">Name must be at least 2 characters</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email" className="text-base font-medium text-gray-700">
          Email Address
        </Label>
        <div className="relative">
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input-field hover-lift pr-16"
            placeholder="john@example.com"
            minLength={5}
            maxLength={50}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {getCharacterCount(formData.email)}
          </span>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password" className="text-base font-medium text-gray-700">
          Password
        </Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            className="input-field hover-lift pr-16"
            placeholder="••••••••"
            minLength={8}
            maxLength={50}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {getCharacterCount(formData.password)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Must be at least 8 characters long
        </p>
      </div>
    </div>
  );
};