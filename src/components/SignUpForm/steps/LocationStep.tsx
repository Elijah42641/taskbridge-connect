import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormData } from "@/types/form";

interface LocationStepProps {
  formData: FormData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationStep = ({ formData, onInputChange }: LocationStepProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="location">Your Location</Label>
        <Input
          id="location"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          className="input-field"
          placeholder="Enter your city"
        />
      </div>
    </div>
  );
};