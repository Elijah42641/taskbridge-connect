import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

interface LocationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationStep = ({ formData, onInputChange }: LocationStepProps) => {
  const getCharacterCount = (value: string) => {
    return `${value.length}/100`;
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Your Location</Label>
        <div className="relative">
          <Input
            id="location"
            name="location"
            value={formData.location}
            onChange={onInputChange}
            className="input-field pr-16"
            placeholder="Enter your city"
            minLength={2}
            maxLength={100}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
            {getCharacterCount(formData.location)}
          </span>
        </div>
      </div>
    </div>
  );
};